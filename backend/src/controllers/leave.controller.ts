import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/supabase';
import { AuthRequest } from '../middleware/auth';
import { sendEmail } from '../services/email.service';

export const applyLeave = async (req: AuthRequest, res: Response) => {
  try {
    const { start_date, end_date, reason } = req.body;
    const userId = req.user!.userId;

    const { error } = await supabase.from('leave_requests').insert({
      id: uuidv4(),
      user_id: userId,
      start_date,
      end_date,
      reason,
      status: 'pending'
    });

    if (error) throw error;
    res.status(201).json({ message: 'Leave request submitted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const approveLeave = async (req: AuthRequest, res: Response) => {
  try {
    const { leave_id } = req.params;
    const { manager_comment } = req.body;
    
    const { data: leave, error } = await supabase
      .from('leave_requests')
      .update({ status: 'approved', manager_comment })
      .eq('id', leave_id)
      .select('*, users(email)')
      .single();

    if (error || !leave) throw error || new Error('Leave not found');

    if (leave.users?.email) {
      await sendEmail(leave.users.email, 'Leave Request Approved', `Your leave for ${leave.start_date} to ${leave.end_date} has been approved.`);
    }

    res.json({ message: 'Leave approved' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
