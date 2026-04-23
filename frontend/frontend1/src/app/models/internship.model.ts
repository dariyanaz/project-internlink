import { Company } from './company.model';

export interface Internship {
  id: number;
  title: string;
  description: string;
  requirements?: string;
  salary?: number;
  duration?: string;
  location?: string;
  work_type?: string;
  is_active?: boolean;
  posted_at?: string;
  deadline?: string;
  created_at?: string;
  category?: string;
  applicants?: number;
  company: Company | number | string;
}