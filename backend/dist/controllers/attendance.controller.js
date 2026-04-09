"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clockOut = exports.clockIn = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("../config/supabase");
const server_1 = require("../server");
const clockIn = async (req, res) => {
    try {
        const { shift_assignment_id } = req.body;
        // Fetch shift assignment and shift details
        const { data: assignment, error: assignErr } = await supabase_1.supabase
            .from('shift_assignments')
            .select('*, shifts(*)')
            .eq('id', shift_assignment_id)
            .single();
        if (assignErr || !assignment)
            throw new Error('Shift assignment not found');
        const now = new Date();
        // Parse shift start time (assuming "HH:mm" format on today's date)
        const shiftDate = new Date(assignment.shifts.shift_date);
        const [hours, minutes] = assignment.shifts.start_time.split(':').map(Number);
        shiftDate.setHours(hours, minutes, 0, 0);
        // Flag late if clocked in more than 10 mins after start time
        const diffInMinutes = (now.getTime() - shiftDate.getTime()) / (1000 * 60);
        const isLate = diffInMinutes > 10;
        const { error: insertErr } = await supabase_1.supabase.from('attendance').insert({
            id: (0, uuid_1.v4)(),
            shift_assignment_id,
            clock_in: now.toISOString(),
            is_late: isLate
        });
        if (insertErr)
            throw insertErr;
        server_1.io.emit('clock_in_event', { shift_assignment_id, user_id: req.user.userId, isLate });
        res.status(201).json({ message: 'Clocked in successfully', is_late: isLate });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.clockIn = clockIn;
const clockOut = async (req, res) => {
    try {
        const { shift_assignment_id } = req.body;
        const now = new Date().toISOString();
        const { error } = await supabase_1.supabase
            .from('attendance')
            .update({ clock_out: now })
            .eq('shift_assignment_id', shift_assignment_id)
            .is('clock_out', null);
        if (error)
            throw error;
        res.json({ message: 'Clocked out successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.clockOut = clockOut;
