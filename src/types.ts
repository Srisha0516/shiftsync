export type Page = 'dashboard' | 'pricing' | 'manager' | 'schedules' | 'team' | 'reports' | 'settings' | 'login';

export interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  business_id?: string;
}
