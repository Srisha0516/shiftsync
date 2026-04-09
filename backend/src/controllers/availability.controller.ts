import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/supabase';
import { AuthRequest } from '../middleware/auth';

export const setAvailability = async (req: AuthRequest, res: Response) => {
  try {
    const { day_of_week, start_time, end_time } = req.body;
    const userId = req.user!.userId;

    const { error } = await supabase.from('availability').insert({
      id: uuidv4(),
      user_id: userId,
      day_of_week,
      start_time,
      end_time
    });

    if (error) throw error;
    res.status(201).json({ message: 'Availability recorded successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeamAvailability = async (req: AuthRequest, res: Response) => {
  try {
    const businessId = req.user!.businessId;
    
    const { data, error } = await supabase
      .from('availability')
      .select('*, users!inner(id, full_name, role, business_id)')
      .eq('users.business_id', businessId);
      
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
