import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/supabase';
import { AuthRequest } from '../middleware/auth';
import { io } from '../server';

export const getAttendanceStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { data: attendance, error } = await supabase
      .from('attendance')
      .select('*, shift_assignments(*, shifts(*))')
      .eq('shift_assignments.user_id', req.user!.userId)
      .is('clock_out', null)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "No rows found"
    
    res.json(attendance || null);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const clockIn = async (req: AuthRequest, res: Response) => {
  try {
    const { shift_assignment_id } = req.body;
    
    // Fetch shift assignment and shift details
    const { data: assignment, error: assignErr } = await supabase
      .from('shift_assignments')
      .select('*, shifts(*)')
      .eq('id', shift_assignment_id)
      .single();

    if (assignErr || !assignment) throw new Error('Shift assignment not found');
    
    const now = new Date();
    // Parse shift start time (assuming "HH:mm" format on today's date)
    const shiftDate = new Date(assignment.shifts.shift_date);
    const [hours, minutes] = assignment.shifts.start_time.split(':').map(Number);
    shiftDate.setHours(hours, minutes, 0, 0);

    // Flag late if clocked in more than 10 mins after start time
    const diffInMinutes = (now.getTime() - shiftDate.getTime()) / (1000 * 60);
    const isLate = diffInMinutes > 10;

    const { error: insertErr } = await supabase.from('attendance').insert({
      id: uuidv4(),
      shift_assignment_id,
      clock_in: now.toISOString(),
      is_late: isLate
    });

    if (insertErr) throw insertErr;

    io.emit('clock_in_event', { shift_assignment_id, user_id: req.user!.userId, isLate });

    res.status(201).json({ message: 'Clocked in successfully', is_late: isLate });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const clockOut = async (req: AuthRequest, res: Response) => {
  try {
    const { shift_assignment_id } = req.body;
    const now = new Date().toISOString();

    const { error } = await supabase
      .from('attendance')
      .update({ clock_out: now })
      .eq('shift_assignment_id', shift_assignment_id)
      .is('clock_out', null);

    if (error) throw error;
    res.json({ message: 'Clocked out successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
