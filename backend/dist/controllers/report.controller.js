"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportCsv = exports.getAttendanceReport = void 0;
const supabase_1 = require("../config/supabase");
const json2csv_1 = require("json2csv");
const getAttendanceReport = async (req, res) => {
    try {
        const businessId = req.user.businessId;
        const { start_date, end_date } = req.query;
        const { data: shifts, error: shiftErr } = await supabase_1.supabase
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
        if (shiftErr)
            throw shiftErr;
        const report = {};
        shifts?.forEach(shift => {
            shift.shift_assignments?.forEach(assignment => {
                const userId = assignment.user_id;
                const user = assignment.users;
                if (!report[userId]) {
                    report[userId] = {
                        name: user?.full_name || user[0]?.full_name,
                        email: user?.email || user[0]?.email,
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
                        if (att.is_late)
                            report[userId].late_count += 1;
                    }
                });
            });
        });
        const reportArray = Object.values(report);
        res.json(reportArray);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAttendanceReport = getAttendanceReport;
const exportCsv = async (req, res) => {
    try {
        // Basic reuse of the JSON builder logic
        await (0, exports.getAttendanceReport)(req, {
            json: async (data) => {
                const fields = ['name', 'email', 'shifts_assigned', 'completed_shifts', 'late_count'];
                const opts = { fields };
                const parser = new json2csv_1.Parser(opts);
                const csv = parser.parse(data);
                res.header('Content-Type', 'text/csv');
                res.attachment('attendance-report.csv');
                return res.send(csv);
            },
            status: (code) => ({ json: (err) => res.status(code).json(err) })
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.exportCsv = exportCsv;
