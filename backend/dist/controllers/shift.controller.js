"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShifts = exports.publishWeeklySchedule = exports.createShift = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("../config/supabase");
const server_1 = require("../server");
const email_service_1 = require("../services/email.service");
const createShift = async (req, res) => {
    try {
        const { title, shift_date, start_time, end_time, user_ids } = req.body;
        const businessId = req.user.businessId;
        const shiftId = (0, uuid_1.v4)();
        // 1. Create Shift
        const { error: shiftErr } = await supabase_1.supabase.from('shifts').insert({
            id: shiftId,
            business_id: businessId,
            title,
            shift_date,
            start_time,
            end_time,
            created_by: req.user.userId
        });
        if (shiftErr)
            throw shiftErr;
        // 2. Assign Shift
        if (user_ids && Array.isArray(user_ids)) {
            const assignments = user_ids.map(uid => ({
                id: (0, uuid_1.v4)(),
                shift_id: shiftId,
                user_id: uid,
                status: 'assigned'
            }));
            const { error: assignErr } = await supabase_1.supabase.from('shift_assignments').insert(assignments);
            if (assignErr)
                throw assignErr;
        }
        res.status(201).json({ message: 'Shift created successfully', shiftId });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createShift = createShift;
const publishWeeklySchedule = async (req, res) => {
    try {
        const { start_date, end_date } = req.body;
        const businessId = req.user.businessId;
        const { data: shifts, error: shiftsErr } = await supabase_1.supabase
            .from('shifts')
            .select('*, shift_assignments(user_id, users(email))')
            .eq('business_id', businessId)
            .gte('shift_date', start_date)
            .lte('shift_date', end_date);
        if (shiftsErr)
            throw shiftsErr;
        server_1.io.emit('schedule_published', { message: 'New schedule published', start_date, end_date });
        shifts?.forEach(shift => {
            shift.shift_assignments?.forEach((assignment) => {
                if (assignment.users?.email) {
                    (0, email_service_1.sendEmail)(assignment.users.email, 'Weekly Schedule Published', 'Your new schedule for the coming week is now available on ShiftSync.');
                }
            });
        });
        res.json({ message: 'Schedule published successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.publishWeeklySchedule = publishWeeklySchedule;
const getShifts = async (req, res) => {
    try {
        const businessId = req.user.businessId;
        const { data, error } = await supabase_1.supabase
            .from('shifts')
            .select('*, shift_assignments(*, users(id, full_name, role))')
            .eq('business_id', businessId);
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getShifts = getShifts;
