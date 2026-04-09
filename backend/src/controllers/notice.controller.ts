import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/supabase';
import { AuthRequest } from '../middleware/auth';
import { io } from '../server';

export const createNotice = async (req: AuthRequest, res: Response) => {
  try {
    const { content } = req.body;
    const businessId = req.user!.businessId;

    const { data: notice, error } = await supabase.from('notices').insert({
      id: uuidv4(),
      business_id: businessId,
      content,
      posted_by: req.user!.userId
    }).select('*').single();

    if (error) throw error;
    
    io.emit('notice_created', notice);
    
    res.status(201).json({ message: 'Notice created', notice });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getNotices = async (req: AuthRequest, res: Response) => {
  try {
    const businessId = req.user!.businessId;
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
