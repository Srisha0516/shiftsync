"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const supabase_1 = require("../config/supabase");
const email_service_1 = require("./email.service");
// Run daily at 7 AM
node_cron_1.default.schedule('0 7 * * *', async () => {
    console.log('Running daily shift reminder cron job...');
    try {
        const today = new Date().toISOString().split('T')[0];
        // Find shifts for today
        const { data: shifts, error } = await supabase_1.supabase
            .from('shifts')
            .select(`
        id,
        title,
        start_time,
        end_time,
        shift_assignments (
          user_id,
          users ( email, full_name )
        )
      `)
            .eq('shift_date', today);
        if (error)
            throw error;
        if (shifts && shifts.length > 0) {
            for (const shift of shifts) {
                if (shift.shift_assignments && Array.isArray(shift.shift_assignments)) {
                    for (const assignment of shift.shift_assignments) {
                        if (assignment.users?.email) {
                            await (0, email_service_1.sendEmail)(assignment.users.email, `Shift Reminder: ${shift.title} Today`, `Hi ${assignment.users.full_name},\nThis is a reminder that you have a shift today (${shift.title}) from ${shift.start_time} to ${shift.end_time}.`);
                        }
                    }
                }
            }
        }
        console.log('Cron job completed successfully.');
    }
    catch (error) {
        console.error('Error in cron job:', error);
    }
});
