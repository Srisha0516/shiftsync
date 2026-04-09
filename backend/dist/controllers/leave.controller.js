"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveLeave = exports.applyLeave = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("../config/supabase");
const email_service_1 = require("../services/email.service");
const applyLeave = async (req, res) => {
    try {
        const { start_date, end_date, reason } = req.body;
        const userId = req.user.userId;
        const { error } = await supabase_1.supabase.from('leave_requests').insert({
            id: (0, uuid_1.v4)(),
            user_id: userId,
            start_date,
            end_date,
            reason,
            status: 'pending'
        });
        if (error)
            throw error;
        res.status(201).json({ message: 'Leave request submitted' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.applyLeave = applyLeave;
const approveLeave = async (req, res) => {
    try {
        const { leave_id } = req.params;
        const { manager_comment } = req.body;
        const { data: leave, error } = await supabase_1.supabase
            .from('leave_requests')
            .update({ status: 'approved', manager_comment })
            .eq('id', leave_id)
            .select('*, users(email)')
            .single();
        if (error || !leave)
            throw error || new Error('Leave not found');
        if (leave.users?.email) {
            await (0, email_service_1.sendEmail)(leave.users.email, 'Leave Request Approved', `Your leave for ${leave.start_date} to ${leave.end_date} has been approved.`);
        }
        res.json({ message: 'Leave approved' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.approveLeave = approveLeave;
