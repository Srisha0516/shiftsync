import { createClient } from '@supabase/supabase-js';
import { config } from './env';

if (!config.supabase.url || !config.supabase.anonKey) {
  console.warn('Missing Supabase credentials. Database operations will fail.');
}

export const supabase = createClient(config.supabase.url, config.supabase.anonKey);
