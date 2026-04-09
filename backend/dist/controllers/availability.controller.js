"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamAvailability = exports.setAvailability = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("../config/supabase");
const setAvailability = async (req, res) => {
    try {
        const { day_of_week, start_time, end_time } = req.body;
        const userId = req.user.userId;
        const { error } = await supabase_1.supabase.from('availability').insert({
            id: (0, uuid_1.v4)(),
            user_id: userId,
            day_of_week,
            start_time,
            end_time
        });
        if (error)
            throw error;
        res.status(201).json({ message: 'Availability recorded successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.setAvailability = setAvailability;
const getTeamAvailability = async (req, res) => {
    try {
        const businessId = req.user.businessId;
        const { data, error } = await supabase_1.supabase
            .from('availability')
            .select('*, users!inner(id, full_name, role, business_id)')
            .eq('users.business_id', businessId);
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getTeamAvailability = getTeamAvailability;
