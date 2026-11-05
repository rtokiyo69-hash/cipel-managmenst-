export type UserRole = 'super_admin' | 'manager' | 'recruiter';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  businessUnit: string;
  title: string;
  phone?: string;
}

export type JobStatus = 'Open' | 'Sourcing' | 'In Review' | 'Closed' | 'On Hold';
export type JobType = 'Full-Time' | 'Contract' | 'C2C' | 'Remote' | 'Hybrid' | 'On-Site';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Job {
  id: string;
  code: string;
  title: string;
  client: string;
  clientId: string;
  businessUnit: string;
  location: string;
  type: JobType;
  status: JobStatus;
  priority: Priority;
  assignedRecruiter: string;
  recruiterId: string;
  createdDate: string;
  openings: number;
  applicantsCount: number;
  billRate: number; // USD per hour or annual
  payRate: number;
  skills: string[];
  experienceRequired: string;
  description: string;
}

export type PipelineStage = 
  | 'New'
  | 'Screening'
  | 'Submitted'
  | 'Interview'
  | 'Selected'
  | 'Offered'
  | 'Hired'
  | 'Rejected';

export interface Applicant {
  id: string;
  applicantId: string;
  name: string;
  email: string;
  phone: string;
  currentDesignation: string;
  location: string;
  experienceYears: number;
  skills: string[];
  source: 'LinkedIn' | 'Direct Career Portal' | 'Referral' | 'Vendor Partner' | 'GitHub';
  status: PipelineStage;
  assignedRecruiter: string;
  assignedJobId?: string;
  assignedJobTitle?: string;
  matchScore: number;
  avatar: string;
  isFavorite?: boolean;
  expectedSalary?: string;
  noticePeriod?: string;
  summary?: string;
  education?: { degree: string; school: string; year: string }[];
  workHistory?: { role: string; company: string; duration: string; summary: string }[];
  documents?: { name: string; size: string; date: string; type: string }[];
  notes?: { id: string; author: string; text: string; date: string }[];
}

export interface Client {
  id: string;
  clientId: string;
  name: string;
  industry: string;
  location: string;
  accountManager: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  activeJobs: number;
  activePlacements: number;
  status: 'Active' | 'Prospect' | 'Inactive';
  tier: 'Enterprise Platinum' | 'Strategic Partner' | 'Standard';
  joinedDate: string;
  notes?: string;
}

export interface Vendor {
  id: string;
  vendorId: string;
  name: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  complianceStatus: 'Verified' | 'Pending Review' | 'Expired';
  rating: number;
  activeCandidates: number;
  status: 'Active' | 'Under Review' | 'Suspended';
}

export interface Interview {
  id: string;
  applicantId: string;
  applicantName: string;
  jobId: string;
  jobTitle: string;
  client: string;
  interviewer: string;
  date: string;
  time: string;
  type: 'Technical Screen' | 'Architecture Deep-Dive' | 'Hiring Manager' | 'Culture & Exec';
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Awaiting Feedback';
  meetingLink: string;
  rating?: number;
  feedback?: string;
}

export interface Submission {
  id: string;
  submissionId: string;
  applicantId: string;
  applicantName: string;
  jobId: string;
  jobTitle: string;
  client: string;
  recruiter: string;
  submittedDate: string;
  billRate: number;
  payRate: number;
  status: 'Submitted to Client' | 'Client Review' | 'Interview Requested' | 'Client Rejected';
  approvalStatus: 'Approved' | 'Pending Approval' | 'Revision Requested';
}

export interface Placement {
  id: string;
  placementId: string;
  applicantName: string;
  jobTitle: string;
  client: string;
  recruiter: string;
  startDate: string;
  endDate: string;
  billRate: number;
  payRate: number;
  margin: number;
  status: 'Active' | 'Completed' | 'Upcoming';
}

export interface TaskItem {
  id: string;
  title: string;
  dueDate: string;
  priority: Priority;
  assignedTo: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  category: 'Interview Follow-up' | 'Offer Release' | 'Vendor Verification' | 'Client Review';
}

export interface ActivityLog {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'job' | 'applicant' | 'submission' | 'interview' | 'placement';
}
