"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const env_1 = require("./env");
if (!env_1.config.supabase.url || !env_1.config.supabase.anonKey) {
    console.warn('Missing Supabase credentials. Database operations will fail.');
}
exports.supabase = (0, supabase_js_1.createClient)(env_1.config.supabase.url, env_1.config.supabase.anonKey);
