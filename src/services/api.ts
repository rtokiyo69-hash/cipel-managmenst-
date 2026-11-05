import {
  User,
  Job,
  Applicant,
  Client,
  Vendor,
  Interview,
  Submission,
  Placement,
  TaskItem,
  ActivityLog,
  PipelineStage
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_CLIENTS,
  INITIAL_JOBS,
  INITIAL_APPLICANTS,
  INITIAL_VENDORS,
  INITIAL_INTERVIEWS,
  INITIAL_SUBMISSIONS,
  INITIAL_PLACEMENTS,
  INITIAL_TASKS,
  INITIAL_ACTIVITIES
} from './mockData';

const STORAGE_KEYS = {
  USERS: 'talentember_users',
  CLIENTS: 'talentember_clients',
  JOBS: 'talentember_jobs',
  APPLICANTS: 'talentember_applicants',
  VENDORS: 'talentember_vendors',
  INTERVIEWS: 'talentember_interviews',
  SUBMISSIONS: 'talentember_submissions',
  PLACEMENTS: 'talentember_placements',
  TASKS: 'talentember_tasks',
  ACTIVITIES: 'talentember_activities',
  CURRENT_USER: 'talentember_current_user'
};

function getStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

// Simulates network delay (100-250ms)
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const ApiService = {
  // Authentication & Users
  async getCurrentUser(): Promise<User> {
    await delay(50);
    return getStorage<User>(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[2]); // Default to Priya Sharma (Recruiter)
  },

  async setCurrentUser(user: User): Promise<void> {
    await delay(80);
    setStorage(STORAGE_KEYS.CURRENT_USER, user);
  },

  async getAllUsers(): Promise<User[]> {
    await delay(120);
    return getStorage<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  },

  // Jobs
  async getJobs(): Promise<Job[]> {
    await delay(150);
    return getStorage<Job[]>(STORAGE_KEYS.JOBS, INITIAL_JOBS);
  },

  async getJobById(id: string): Promise<Job | undefined> {
    await delay(100);
    const jobs = await this.getJobs();
    return jobs.find((j) => j.id === id);
  },

  async createJob(jobData: Omit<Job, 'id' | 'code' | 'createdDate' | 'applicantsCount'>): Promise<Job> {
    await delay(200);
    const jobs = await this.getJobs();
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      code: `JOB-2026-0${jobs.length + 86}`,
      createdDate: new Date().toISOString().split('T')[0],
      applicantsCount: 0
    };
    const updated = [newJob, ...jobs];
    setStorage(STORAGE_KEYS.JOBS, updated);

    await this.logActivity({
      user: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
      action: 'created new requisition:',
      target: newJob.title,
      type: 'job'
    });

    return newJob;
  },

  async updateJob(id: string, updates: Partial<Job>): Promise<Job> {
    await delay(180);
    const jobs = await this.getJobs();
    const index = jobs.findIndex((j) => j.id === id);
    if (index === -1) throw new Error('Job not found');
    const updated = { ...jobs[index], ...updates };
    jobs[index] = updated;
    setStorage(STORAGE_KEYS.JOBS, jobs);
    return updated;
  },

  async deleteJob(id: string): Promise<void> {
    await delay(150);
    const jobs = await this.getJobs();
    setStorage(STORAGE_KEYS.JOBS, jobs.filter((j) => j.id !== id));
  },

  // Applicants
  async getApplicants(): Promise<Applicant[]> {
    await delay(150);
    return getStorage<Applicant[]>(STORAGE_KEYS.APPLICANTS, INITIAL_APPLICANTS);
  },

  async getApplicantById(id: string): Promise<Applicant | undefined> {
    await delay(100);
    const applicants = await this.getApplicants();
    return applicants.find((a) => a.id === id);
  },

  async createApplicant(applicantData: Partial<Applicant>): Promise<Applicant> {
    await delay(220);
    const applicants = await this.getApplicants();
    const newApplicant: Applicant = {
      id: `app-${Date.now()}`,
      applicantId: `APP-90${applicants.length + 28}`,
      name: applicantData.name || 'New Candidate',
      email: applicantData.email || '',
      phone: applicantData.phone || '+1 (555) 000-0000',
      currentDesignation: applicantData.currentDesignation || 'Software Specialist',
      location: applicantData.location || 'Remote',
      experienceYears: applicantData.experienceYears || 5,
      skills: applicantData.skills || ['TypeScript', 'Cloud'],
      source: applicantData.source || 'Direct Career Portal',
      status: (applicantData.status as PipelineStage) || 'New',
      assignedRecruiter: applicantData.assignedRecruiter || 'Priya Sharma',
      assignedJobId: applicantData.assignedJobId,
      assignedJobTitle: applicantData.assignedJobTitle,
      matchScore: applicantData.matchScore || Math.floor(Math.random() * 20 + 80),
      avatar: applicantData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
      isFavorite: false,
      summary: applicantData.summary || 'Profile parsed and imported into NexusTalent ATS repository.',
      documents: applicantData.documents || [
        { name: `${(applicantData.name || 'Candidate').replace(/\s+/g, '_')}_Resume.pdf`, size: '1.2 MB', date: new Date().toISOString().split('T')[0], type: 'Resume' }
      ],
      notes: [
        { id: `nt-${Date.now()}`, author: 'NexusTalent AI Parser', text: 'Resume extracted with high confidence. Key skills matched to active open requisitions.', date: 'Just now' }
      ]
    };

    const updated = [newApplicant, ...applicants];
    setStorage(STORAGE_KEYS.APPLICANTS, updated);

    await this.logActivity({
      user: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
      action: 'onboarded candidate:',
      target: newApplicant.name,
      type: 'applicant'
    });

    return newApplicant;
  },

  async updateApplicant(id: string, updates: Partial<Applicant>): Promise<Applicant> {
    await delay(150);
    const applicants = await this.getApplicants();
    const index = applicants.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Applicant not found');
    const updated = { ...applicants[index], ...updates };
    applicants[index] = updated;
    setStorage(STORAGE_KEYS.APPLICANTS, applicants);
    return updated;
  },

  async toggleFavorite(id: string): Promise<boolean> {
    const applicants = await this.getApplicants();
    const applicant = applicants.find((a) => a.id === id);
    if (applicant) {
      applicant.isFavorite = !applicant.isFavorite;
      setStorage(STORAGE_KEYS.APPLICANTS, applicants);
      return applicant.isFavorite;
    }
    return false;
  },

  async updateApplicantStage(id: string, newStage: PipelineStage): Promise<void> {
    await delay(120);
    const applicants = await this.getApplicants();
    const candidate = applicants.find((a) => a.id === id);
    if (candidate) {
      const oldStage = candidate.status;
      candidate.status = newStage;
      setStorage(STORAGE_KEYS.APPLICANTS, applicants);

      await this.logActivity({
        user: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        action: `advanced ${candidate.name} from ${oldStage} to`,
        target: newStage,
        type: 'applicant'
      });
    }
  },

  // Clients
  async getClients(): Promise<Client[]> {
    await delay(130);
    return getStorage<Client[]>(STORAGE_KEYS.CLIENTS, INITIAL_CLIENTS);
  },

  async createClient(clientData: Omit<Client, 'id' | 'clientId' | 'joinedDate'>): Promise<Client> {
    await delay(180);
    const clients = await this.getClients();
    const newClient: Client = {
      ...clientData,
      id: `cli-${Date.now()}`,
      clientId: `CLI-${clients.length + 1005}`,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    const updated = [newClient, ...clients];
    setStorage(STORAGE_KEYS.CLIENTS, updated);
    return newClient;
  },

  // Vendors
  async getVendors(): Promise<Vendor[]> {
    await delay(130);
    return getStorage<Vendor[]>(STORAGE_KEYS.VENDORS, INITIAL_VENDORS);
  },

  async createVendor(vendorData: Omit<Vendor, 'id' | 'vendorId'>): Promise<Vendor> {
    await delay(180);
    const vendors = await this.getVendors();
    const newVendor: Vendor = {
      ...vendorData,
      id: `ven-${Date.now()}`,
      vendorId: `VEN-${vendors.length + 504}`
    };
    const updated = [newVendor, ...vendors];
    setStorage(STORAGE_KEYS.VENDORS, updated);
    return newVendor;
  },

  // Interviews
  async getInterviews(): Promise<Interview[]> {
    await delay(130);
    return getStorage<Interview[]>(STORAGE_KEYS.INTERVIEWS, INITIAL_INTERVIEWS);
  },

  async scheduleInterview(interviewData: Omit<Interview, 'id'>): Promise<Interview> {
    await delay(180);
    const interviews = await this.getInterviews();
    const newInterview: Interview = {
      ...interviewData,
      id: `int-${Date.now()}`
    };
    const updated = [newInterview, ...interviews];
    setStorage(STORAGE_KEYS.INTERVIEWS, updated);

    await this.logActivity({
      user: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
      action: 'booked interview for',
      target: `${newInterview.applicantName} with ${newInterview.client}`,
      type: 'interview'
    });

    return newInterview;
  },

  async updateInterviewStatus(id: string, status: Interview['status'], feedback?: string, rating?: number): Promise<void> {
    await delay(140);
    const interviews = await this.getInterviews();
    const item = interviews.find((i) => i.id === id);
    if (item) {
      item.status = status;
      if (feedback !== undefined) item.feedback = feedback;
      if (rating !== undefined) item.rating = rating;
      setStorage(STORAGE_KEYS.INTERVIEWS, interviews);
    }
  },

  // Submissions
  async getSubmissions(): Promise<Submission[]> {
    await delay(130);
    return getStorage<Submission[]>(STORAGE_KEYS.SUBMISSIONS, INITIAL_SUBMISSIONS);
  },

  async updateSubmissionApproval(id: string, approvalStatus: Submission['approvalStatus']): Promise<void> {
    await delay(140);
    const submissions = await this.getSubmissions();
    const item = submissions.find((s) => s.id === id);
    if (item) {
      item.approvalStatus = approvalStatus;
      setStorage(STORAGE_KEYS.SUBMISSIONS, submissions);
    }
  },

  // Placements
  async getPlacements(): Promise<Placement[]> {
    await delay(130);
    return getStorage<Placement[]>(STORAGE_KEYS.PLACEMENTS, INITIAL_PLACEMENTS);
  },

  // Tasks
  async getTasks(): Promise<TaskItem[]> {
    await delay(120);
    return getStorage<TaskItem[]>(STORAGE_KEYS.TASKS, INITIAL_TASKS);
  },

  async toggleTaskStatus(id: string): Promise<void> {
    const tasks = await this.getTasks();
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.status = task.status === 'Completed' ? 'In Progress' : 'Completed';
      setStorage(STORAGE_KEYS.TASKS, tasks);
    }
  },

  // Activities
  async getActivities(): Promise<ActivityLog[]> {
    await delay(100);
    return getStorage<ActivityLog[]>(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
  },

  async logActivity(activity: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<void> {
    const activities = await this.getActivities();
    const newActivity: ActivityLog = {
      ...activity,
      id: `act-${Date.now()}`,
      timestamp: 'Just now'
    };
    setStorage(STORAGE_KEYS.ACTIVITIES, [newActivity, ...activities.slice(0, 19)]);
  },

  // Reset to initial mock data
  resetAllData(): void {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  }
};
