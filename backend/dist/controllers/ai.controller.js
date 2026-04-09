"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSchedule = void 0;
const supabase_1 = require("../config/supabase");
const env_1 = require("../config/env");
const uuid_1 = require("uuid");
const generateSchedule = async (req, res) => {
    try {
        const businessId = req.user.businessId;
        const { start_date, end_date } = req.body;
        // Fetch team availability
        const { data: teamAvail, error: availErr } = await supabase_1.supabase
            .from('availability')
            .select('*, users!inner(id, business_id)')
            .eq('users.business_id', businessId);
        if (availErr)
            throw availErr;
        let scheduleJson;
        // If no API key, use mock algorithm logic
        if (!env_1.config.claudeApiKey || env_1.config.claudeApiKey === 'your_anthropic_api_key') {
            console.log('Using mock AI scheduler');
            scheduleJson = teamAvail?.map(av => ({
                user_id: av.user_id,
                title: 'Auto-Scheduled Shift',
                shift_date: start_date, // mocking for simplicity
                start_time: av.start_time,
                end_time: av.end_time
            }));
        }
        else {
            // Stub for real Claude AI API call
            // const response = await fetch('https://api.anthropic.com/v1/messages', { ... });
            // scheduleJson = await response.json();
            throw new Error('Claude Integration requires API logic to be fully implemented');
        }
        // Save generated array of shifts to database
        const shiftRecords = [];
        const assignmentRecords = [];
        for (const shift of scheduleJson || []) {
            const shiftId = (0, uuid_1.v4)();
            shiftRecords.push({
                id: shiftId,
                business_id: businessId,
                title: shift.title || 'Shift',
                shift_date: shift.shift_date,
                start_time: shift.start_time,
                end_time: shift.end_time,
                created_by: req.user.userId
            });
            assignmentRecords.push({
                id: (0, uuid_1.v4)(),
                shift_id: shiftId,
                user_id: shift.user_id,
                status: 'assigned'
            });
        }
        if (shiftRecords.length > 0) {
            await supabase_1.supabase.from('shifts').insert(shiftRecords);
            await supabase_1.supabase.from('shift_assignments').insert(assignmentRecords);
        }
        res.json({ message: 'Schedule generated and saved successfully', schedule: scheduleJson });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.generateSchedule = generateSchedule;
