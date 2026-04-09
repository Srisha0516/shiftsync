"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotices = exports.createNotice = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("../config/supabase");
const server_1 = require("../server");
const createNotice = async (req, res) => {
    try {
        const { content } = req.body;
        const businessId = req.user.businessId;
        const { data: notice, error } = await supabase_1.supabase.from('notices').insert({
            id: (0, uuid_1.v4)(),
            business_id: businessId,
            content,
            posted_by: req.user.userId
        }).select('*').single();
        if (error)
            throw error;
        server_1.io.emit('notice_created', notice);
        res.status(201).json({ message: 'Notice created', notice });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createNotice = createNotice;
const getNotices = async (req, res) => {
    try {
        const businessId = req.user.businessId;
        const { data, error } = await supabase_1.supabase
            .from('notices')
            .select('*')
            .eq('business_id', businessId)
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getNotices = getNotices;
