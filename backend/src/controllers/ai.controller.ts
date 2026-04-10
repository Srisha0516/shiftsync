import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { AuthRequest } from '../middleware/auth';
import { config } from '../config/env';
import { v4 as uuidv4 } from 'uuid';

export const generateSchedule = async (req: AuthRequest, res: Response) => {
  try {
    const businessId = req.user!.businessId;
    const { start_date, end_date } = req.body;

    // Fetch team availability
    const { data: teamAvail, error: availErr } = await supabase
      .from('availability')
      .select('*, users!inner(id, business_id)')
      .eq('users.business_id', businessId);

    if (availErr) throw availErr;

    let scheduleJson;

    // If no API key, use mock algorithm logic
    if (!config.claudeApiKey || config.claudeApiKey === 'your_anthropic_api_key' || config.claudeApiKey === '') {
      console.log('Using mock AI scheduler');
      
      const shiftsToGen = [];
      const days = 7;
      const startDate = new Date(start_date);

      // Fetch all employees if no availability found
      const { data: users } = await supabase
        .from('users')
        .select('id, full_name')
        .eq('business_id', businessId);

      for(let i = 0; i < days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dateStr = currentDate.toISOString().split('T')[0];

        users?.forEach(u => {
          shiftsToGen.push({
            user_id: u.id,
            title: i % 2 === 0 ? 'Morning Service' : 'Evening Service',
            shift_date: dateStr,
            start_time: i % 2 === 0 ? '08:00' : '16:00',
            end_time: i % 2 === 0 ? '16:00' : '23:00'
          });
        });
      }
      scheduleJson = shiftsToGen;
    } else {
      // Stub for real AI
      scheduleJson = [];
    }

    // Save generated array of shifts to database
    const shiftRecords = [];
    const assignmentRecords = [];

    for (const shift of scheduleJson || []) {
      const shiftId = uuidv4();
      shiftRecords.push({
        id: shiftId,
        business_id: businessId,
        title: shift.title || 'Shift',
        shift_date: shift.shift_date,
        start_time: shift.start_time,
        end_time: shift.end_time,
        created_by: req.user!.userId
      });

      assignmentRecords.push({
        id: uuidv4(),
        shift_id: shiftId,
        user_id: shift.user_id,
        status: 'assigned'
      });
    }

    if (shiftRecords.length > 0) {
      await supabase.from('shifts').insert(shiftRecords);
      await supabase.from('shift_assignments').insert(assignmentRecords);
    }

    res.json({ message: 'Schedule generated and saved successfully', schedule: scheduleJson });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
