import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { AuthRequest } from '../middleware/auth';
import { AsyncParser } from 'json2csv';

export const getAttendanceReport = async (req: AuthRequest, res: Response) => {
  try {
    const businessId = req.user!.businessId;
    const { start_date, end_date } = req.query;

    const { data: shifts, error: shiftErr } = await supabase
      .from('shifts')
      .select(`
        id, 
        shift_date,
        shift_assignments(
          user_id,
          attendance(clock_in, clock_out, is_late),
          users(full_name, email)
        )
      `)
      .eq('business_id', businessId)
      .gte('shift_date', start_date)
      .lte('shift_date', end_date);

    if (shiftErr) throw shiftErr;

    const report: any = {};

    shifts?.forEach(shift => {
      shift.shift_assignments?.forEach(assignment => {
        const userId = assignment.user_id;
        const user = assignment.users;
        
        if (!report[userId]) {
          report[userId] = {
            name: user?.full_name,
            email: user?.email,
            shifts_assigned: 0,
            late_count: 0,
            completed_shifts: 0
          };
        }
        
        report[userId].shifts_assigned += 1;
        
        const attendanceList = Array.isArray(assignment.attendance) ? assignment.attendance : [assignment.attendance];
        attendanceList.forEach(att => {
          if (att) {
            report[userId].completed_shifts += 1;
            if (att.is_late) report[userId].late_count += 1;
          }
        });
      });
    });

    const reportArray = Object.values(report);
    res.json(reportArray);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const exportCsv = async (req: AuthRequest, res: Response) => {
  try {
    // Basic reuse of the JSON builder logic
    await getAttendanceReport(req, {
      json: async (data: any) => {
        const fields = ['name', 'email', 'shifts_assigned', 'completed_shifts', 'late_count'];
        const opts = { fields };
        const parser = new AsyncParser(opts);
        const csv = await parser.parse(data).promise();
        
        res.header('Content-Type', 'text/csv');
        res.attachment('attendance-report.csv');
        return res.send(csv);
      },
      status: (code: number) => ({ json: (err: any) => res.status(code).json(err) })
    } as any);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
