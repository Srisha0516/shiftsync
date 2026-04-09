"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveSwap = exports.requestSwap = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("../config/supabase");
const server_1 = require("../server");
const requestSwap = async (req, res) => {
    try {
        const { shift_id, target_id } = req.body;
        const requesterId = req.user.userId;
        const { error } = await supabase_1.supabase.from('swap_requests').insert({
            id: (0, uuid_1.v4)(),
            shift_id,
            requester_id: requesterId,
            target_id,
            status: 'pending'
        });
        if (error)
            throw error;
        server_1.io.emit('swap_updated', { shift_id, status: 'pending' });
        res.status(201).json({ message: 'Swap request submitted' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.requestSwap = requestSwap;
const approveSwap = async (req, res) => {
    try {
        const { swap_id } = req.params;
        // First, update the swap request
        const { data: swap, error: swapErr } = await supabase_1.supabase
            .from('swap_requests')
            .update({ status: 'approved', manager_approved: true })
            .eq('id', swap_id)
            .select('*')
            .single();
        if (swapErr || !swap)
            throw swapErr;
        // Then update the shift assignment to the new target user
        const { error: assignErr } = await supabase_1.supabase
            .from('shift_assignments')
            .update({ user_id: swap.target_id })
            .eq('shift_id', swap.shift_id)
            .eq('user_id', swap.requester_id);
        if (assignErr)
            throw assignErr;
        server_1.io.emit('swap_updated', { shift_id: swap.shift_id, status: 'approved' });
        res.json({ message: 'Swap approved and shift re-assigned' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.approveSwap = approveSwap;
