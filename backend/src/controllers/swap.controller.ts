import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/supabase';
import { AuthRequest } from '../middleware/auth';
import { io } from '../server';

export const requestSwap = async (req: AuthRequest, res: Response) => {
  try {
    const { shift_id, target_id } = req.body;
    const requesterId = req.user!.userId;

    const { error } = await supabase.from('swap_requests').insert({
      id: uuidv4(),
      shift_id,
      requester_id: requesterId,
      target_id,
      status: 'pending'
    });

    if (error) throw error;
    io.emit('swap_updated', { shift_id, status: 'pending' });
    res.status(201).json({ message: 'Swap request submitted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const approveSwap = async (req: AuthRequest, res: Response) => {
  try {
    const { swap_id } = req.params;
    
    // First, update the swap request
    const { data: swap, error: swapErr } = await supabase
      .from('swap_requests')
      .update({ status: 'approved', manager_approved: true })
      .eq('id', swap_id)
      .select('*')
      .single();

    if (swapErr || !swap) throw swapErr;

    // Then update the shift assignment to the new target user
    const { error: assignErr } = await supabase
      .from('shift_assignments')
      .update({ user_id: swap.target_id })
      .eq('shift_id', swap.shift_id)
      .eq('user_id', swap.requester_id);

    if (assignErr) throw assignErr;

    io.emit('swap_updated', { shift_id: swap.shift_id, status: 'approved' });
    res.json({ message: 'Swap approved and shift re-assigned' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
