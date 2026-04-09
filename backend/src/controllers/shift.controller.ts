import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/supabase';
import { io } from '../server';
import { AuthRequest } from '../middleware/auth';
import { sendEmail } from '../services/email.service';

export const createShift = async (req: AuthRequest, res: Response) => {
  try {
    const { title, shift_date, start_time, end_time, user_ids } = req.body;
    const businessId = req.user!.businessId;
    const shiftId = uuidv4();

    // 1. Create Shift
    const { error: shiftErr } = await supabase.from('shifts').insert({
      id: shiftId,
      business_id: businessId,
      title,
      shift_date,
      start_time,
      end_time,
      created_by: req.user!.userId
    });

    if (shiftErr) throw shiftErr;

    // 2. Assign Shift
    if (user_ids && Array.isArray(user_ids)) {
      const assignments = user_ids.map(uid => ({
        id: uuidv4(),
        shift_id: shiftId,
        user_id: uid,
        status: 'assigned'
      }));
      
      const { error: assignErr } = await supabase.from('shift_assignments').insert(assignments);
      if (assignErr) throw assignErr;
    }

    res.status(201).json({ message: 'Shift created successfully', shiftId });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const publishWeeklySchedule = async (req: AuthRequest, res: Response) => {
  try {
    const { start_date, end_date } = req.body;
    const businessId = req.user!.businessId;

    const { data: shifts, error: shiftsErr } = await supabase
      .from('shifts')
      .select('*, shift_assignments(user_id, users(email))')
      .eq('business_id', businessId)
      .gte('shift_date', start_date)
      .lte('shift_date', end_date);

    if (shiftsErr) throw shiftsErr;

    io.emit('schedule_published', { message: 'New schedule published', start_date, end_date });

    shifts?.forEach(shift => {
      shift.shift_assignments?.forEach((assignment: any) => {
        if (assignment.users?.email) {
          sendEmail(assignment.users.email, 'Weekly Schedule Published', 'Your new schedule for the coming week is now available on ShiftSync.');
        }
      });
    });

    res.json({ message: 'Schedule published successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getShifts = async (req: AuthRequest, res: Response) => {
  try {
    const businessId = req.user!.businessId;
    const { data, error } = await supabase
      .from('shifts')
      .select('*, shift_assignments(*, users(id, full_name, role))')
      .eq('business_id', businessId);
      
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
