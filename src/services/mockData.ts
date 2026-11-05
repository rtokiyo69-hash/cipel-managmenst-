import { User, Job, Applicant, Client, Vendor, Interview, Submission, Placement, TaskItem, ActivityLog } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Elena Rostova',
    email: 'elena.rostova@talentember.io',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    businessUnit: 'Global Operations',
    title: 'Chief Talent Operations Officer',
    phone: '+1 (415) 890-2341'
  },
  {
    id: 'usr-2',
    name: 'Rajesh Ramanathan',
    email: 'rajesh.r@talentember.io',
    role: 'manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    businessUnit: 'Cloud & AI Practice',
    title: 'Senior Recruitment Practice Director',
    phone: '+91 98450 12890'
  },
  {
    id: 'usr-3',
    name: 'Priya Sharma',
    email: 'priya.sharma@talentember.io',
    role: 'recruiter',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    businessUnit: 'Cloud & AI Practice',
    title: 'Lead Technical Recruiter',
    phone: '+91 99201 44521'
  },
  {
    id: 'usr-4',
    name: 'Marcus Vance',
    email: 'marcus.v@talentember.io',
    role: 'recruiter',
    avatar: '/src/assets/images/candidate_profile_marcus_1793866558379.jpg',
    businessUnit: 'Fintech & Enterprise',
    title: 'Senior Technical Talent Partner',
    phone: '+1 (512) 674-9011'
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli-1',
    clientId: 'CLI-1001',
    name: 'CloudScale Enterprises',
    industry: 'Cloud Infrastructure & SaaS',
    location: 'San Jose, CA & Bengaluru',
    accountManager: 'Rajesh Ramanathan',
    contactPerson: 'David Chen',
    contactEmail: 'd.chen@cloudscale.net',
    contactPhone: '+1 (408) 555-0182',
    activeJobs: 6,
    activePlacements: 14,
    status: 'Active',
    tier: 'Enterprise Platinum',
    joinedDate: '2023-04-12',
    notes: 'Primary enterprise sponsor. Requires Fast-Track interview turnaround under 48 hours.'
  },
  {
    id: 'cli-2',
    clientId: 'CLI-1002',
    name: 'FinEdge Global Capital',
    industry: 'Quantitative Banking & Fintech',
    location: 'New York, NY & London',
    accountManager: 'Elena Rostova',
    contactPerson: 'Samantha Miller',
    contactEmail: 'samantha.m@finedge.com',
    contactPhone: '+1 (212) 555-9012',
    activeJobs: 4,
    activePlacements: 9,
    status: 'Active',
    tier: 'Enterprise Platinum',
    joinedDate: '2022-11-05',
    notes: 'Strict background checks and C2C/W2 rate caps apply.'
  },
  {
    id: 'cli-3',
    clientId: 'CLI-1003',
    name: 'NovaPay Distributed Systems',
    industry: 'Payments & Blockchain Infra',
    location: 'Austin, TX & Hyderabad',
    accountManager: 'Rajesh Ramanathan',
    contactPerson: 'Vikram Seth',
    contactEmail: 'v.seth@novapay.io',
    contactPhone: '+91 40 6689 3200',
    activeJobs: 3,
    activePlacements: 6,
    status: 'Active',
    tier: 'Strategic Partner',
    joinedDate: '2024-01-18',
    notes: 'Fast growing team looking for Rust and Go engineers.'
  },
  {
    id: 'cli-4',
    clientId: 'CLI-1004',
    name: 'MedTech Diagnostics AI',
    industry: 'Healthcare Technology',
    location: 'Boston, MA & Pune',
    accountManager: 'Elena Rostova',
    contactPerson: 'Dr. Arthur Vance',
    contactEmail: 'a.vance@medtech-ai.org',
    contactPhone: '+1 (617) 555-7840',
    activeJobs: 2,
    activePlacements: 4,
    status: 'Active',
    tier: 'Strategic Partner',
    joinedDate: '2024-06-10',
    notes: 'FDA compliance and HIPAA certification knowledge needed.'
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    code: 'JOB-2026-081',
    title: 'Staff Distributed Systems Engineer (Rust / Go)',
    client: 'NovaPay Distributed Systems',
    clientId: 'cli-3',
    businessUnit: 'Core Engineering',
    location: 'Remote (US / India)',
    type: 'Full-Time',
    status: 'Open',
    priority: 'Urgent',
    assignedRecruiter: 'Priya Sharma',
    recruiterId: 'usr-3',
    createdDate: '2026-10-28',
    openings: 3,
    applicantsCount: 18,
    billRate: 145,
    payRate: 110,
    skills: ['Rust', 'Go', 'Raft Consensus', 'Kubernetes', 'High-Throughput IO'],
    experienceRequired: '7-12 Years',
    description: 'We are seeking an exceptional Staff Engineer to architect low-latency transaction processing pipelines handling over 50,000 TPS.'
  },
  {
    id: 'job-2',
    code: 'JOB-2026-082',
    title: 'Principal Cloud AI Architect (AWS / Kubernetes)',
    client: 'CloudScale Enterprises',
    clientId: 'cli-1',
    businessUnit: 'Cloud & AI Practice',
    location: 'San Jose, CA & Bengaluru (Hybrid)',
    type: 'Contract',
    status: 'Sourcing',
    priority: 'High',
    assignedRecruiter: 'Priya Sharma',
    recruiterId: 'usr-3',
    createdDate: '2026-10-25',
    openings: 2,
    applicantsCount: 14,
    billRate: 165,
    payRate: 125,
    skills: ['AWS', 'Kubernetes', 'Terraform', 'MLOps', 'vLLM', 'Distributed Training'],
    experienceRequired: '10+ Years',
    description: 'Leading multi-region cloud topology for GenAI enterprise models, LLM serving clusters, and zero-downtime scaling.'
  },
  {
    id: 'job-3',
    code: 'JOB-2026-083',
    title: 'Senior Full Stack Lead (React, Node.js, TypeScript)',
    client: 'FinEdge Global Capital',
    clientId: 'cli-2',
    businessUnit: 'Fintech & Enterprise',
    location: 'New York, NY (Hybrid)',
    type: 'Full-Time',
    status: 'Open',
    priority: 'High',
    assignedRecruiter: 'Marcus Vance',
    recruiterId: 'usr-4',
    createdDate: '2026-10-22',
    openings: 2,
    applicantsCount: 22,
    billRate: 130,
    payRate: 98,
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSockets', 'Tailwind'],
    experienceRequired: '6-9 Years',
    description: 'Build real-time portfolio risk visualizer, algorithmic trade execution consoles, and responsive high-frequency dashboards.'
  },
  {
    id: 'job-4',
    code: 'JOB-2026-084',
    title: 'DevOps & Site Reliability Engineer Lead',
    client: 'CloudScale Enterprises',
    clientId: 'cli-1',
    businessUnit: 'Core Engineering',
    location: 'Bengaluru / Hyderabad (On-Site)',
    type: 'Full-Time',
    status: 'In Review',
    priority: 'Medium',
    assignedRecruiter: 'Priya Sharma',
    recruiterId: 'usr-3',
    createdDate: '2026-10-15',
    openings: 1,
    applicantsCount: 9,
    billRate: 115,
    payRate: 85,
    skills: ['ArgoCD', 'Prometheus', 'Helm', 'GCP', 'Linux Kernel', 'Chaos Engineering'],
    experienceRequired: '5-8 Years',
    description: 'Own production uptime SLA (99.99%), automated canary rollouts, and disaster recovery architectures.'
  },
  {
    id: 'job-5',
    code: 'JOB-2026-085',
    title: 'Clinical AI Research Engineer',
    client: 'MedTech Diagnostics AI',
    clientId: 'cli-4',
    businessUnit: 'Healthcare Practice',
    location: 'Boston, MA (Hybrid)',
    type: 'Contract',
    status: 'Open',
    priority: 'Medium',
    assignedRecruiter: 'Marcus Vance',
    recruiterId: 'usr-4',
    createdDate: '2026-11-01',
    openings: 1,
    applicantsCount: 7,
    billRate: 150,
    payRate: 115,
    skills: ['PyTorch', 'DICOM Imaging', 'Computer Vision', 'Python', 'HIPAA'],
    experienceRequired: '4-7 Years',
    description: 'Develop computer vision models for automated diagnostic radiological scans and real-time inference optimization.'
  }
];

export const INITIAL_APPLICANTS: Applicant[] = [
  {
    id: 'app-1',
    applicantId: 'APP-9021',
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@techconnect.org',
    phone: '+91 98204 55120',
    currentDesignation: 'Lead Cloud Infrastructure Architect',
    location: 'Bengaluru, India (Open to Remote / Relo)',
    experienceYears: 9,
    skills: ['AWS', 'Kubernetes', 'Terraform', 'MLOps', 'Docker', 'Distributed Systems'],
    source: 'LinkedIn',
    status: 'Interview',
    assignedRecruiter: 'Priya Sharma',
    assignedJobId: 'job-2',
    assignedJobTitle: 'Principal Cloud AI Architect (AWS / Kubernetes)',
    matchScore: 94,
    avatar: '/src/assets/images/candidate_profile_ananya_1793866559236.jpg',
    isFavorite: true,
    expectedSalary: '$140k / ₹45 LPA',
    noticePeriod: '30 Days',
    summary: 'Seasoned cloud architect with deep experience scaling Kubernetes clusters to 5,000+ worker nodes and orchestrating multi-region distributed AI model workloads.',
    education: [
      { degree: 'M.Tech in Computer Science', school: 'IIT Bombay', year: '2017' },
      { degree: 'B.E. in Information Technology', school: 'Pune University', year: '2015' }
    ],
    workHistory: [
      { role: 'Staff Cloud Architect', company: 'HyperScale Systems', duration: '2021 - Present', summary: 'Architected automated multi-cloud hybrid topology reducing egress costs by 38%.' },
      { role: 'Senior DevOps Specialist', company: 'Zeta Technologies', duration: '2018 - 2021', summary: 'Implemented GitOps pipelines with ArgoCD serving 200+ microservices.' }
    ],
    documents: [
      { name: 'Ananya_Deshmukh_CurriculumVitae_2026.pdf', size: '1.4 MB', date: '2026-10-26', type: 'Resume' },
      { name: 'AWS_Solutions_Architect_Professional.pdf', size: '480 KB', date: '2026-10-26', type: 'Certificate' }
    ],
    notes: [
      { id: 'nt-1', author: 'Priya Sharma', text: 'Screened on Oct 27. Excellent communication and solid hands-on knowledge with high-concurrency Kubernetes networking.', date: '2026-10-27 11:30 AM' },
      { id: 'nt-2', author: 'Rajesh Ramanathan', text: 'Approved for client technical interview with David Chen at CloudScale.', date: '2026-10-29 04:15 PM' }
    ]
  },
  {
    id: 'app-2',
    applicantId: 'APP-9022',
    name: 'Devon Sterling',
    email: 'devon.sterling@nyclogic.dev',
    phone: '+1 (646) 381-9942',
    currentDesignation: 'Senior Frontend Tech Lead',
    location: 'New York, NY',
    experienceYears: 7,
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSockets', 'Tailwind', 'Next.js'],
    source: 'Referral',
    status: 'Selected',
    assignedRecruiter: 'Marcus Vance',
    assignedJobId: 'job-3',
    assignedJobTitle: 'Senior Full Stack Lead (React, Node.js, TypeScript)',
    matchScore: 91,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    isFavorite: true,
    expectedSalary: '$165,000 / yr',
    noticePeriod: 'Immediate',
    summary: 'Full-stack UI/UX architect specializing in ultra-low-latency financial streaming tickers, React 19 concurrent features, and enterprise component design systems.',
    education: [
      { degree: 'B.S. in Computer Science', school: 'Columbia University', year: '2019' }
    ],
    workHistory: [
      { role: 'Lead Frontend Engineer', company: 'Beacon Financial Tickers', duration: '2022 - Present', summary: 'Designed WebSocket streaming canvas rendering 60fps stock market heatmaps.' }
    ],
    documents: [
      { name: 'Devon_Sterling_Resume_FullStack.pdf', size: '890 KB', date: '2026-10-24', type: 'Resume' }
    ],
    notes: [
      { id: 'nt-3', author: 'Marcus Vance', text: 'Client technical panel gave top marks (5/5). Offer package being structured.', date: '2026-11-02 02:40 PM' }
    ]
  },
  {
    id: 'app-3',
    applicantId: 'APP-9023',
    name: 'Vikramaditya Roy',
    email: 'v.roy@syskernel.net',
    phone: '+91 97110 88231',
    currentDesignation: 'Principal Distributed Systems Engineer',
    location: 'Hyderabad, India (Remote Available)',
    experienceYears: 11,
    skills: ['Rust', 'Go', 'Raft Consensus', 'Kubernetes', 'High-Throughput IO', 'eBPF'],
    source: 'Direct Career Portal',
    status: 'Submitted',
    assignedRecruiter: 'Priya Sharma',
    assignedJobId: 'job-1',
    assignedJobTitle: 'Staff Distributed Systems Engineer (Rust / Go)',
    matchScore: 96,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250',
    isFavorite: false,
    expectedSalary: '₹55 LPA / $155k',
    noticePeriod: '45 Days',
    summary: 'Distributed storage specialist and contributor to open-source consensus libraries. Deep experience in lockless algorithms, asynchronous actor models, and high TPS architectures.'
  },
  {
    id: 'app-4',
    applicantId: 'APP-9024',
    name: 'Clara Johansson',
    email: 'clara.johansson@stockholmlab.se',
    phone: '+46 8 123 4567',
    currentDesignation: 'Staff ML Research Scientist',
    location: 'Stockholm, Sweden / Boston Relocation',
    experienceYears: 6,
    skills: ['PyTorch', 'DICOM Imaging', 'Computer Vision', 'Python', 'HIPAA', 'TensorRT'],
    source: 'LinkedIn',
    status: 'Screening',
    assignedRecruiter: 'Marcus Vance',
    assignedJobId: 'job-5',
    assignedJobTitle: 'Clinical AI Research Engineer',
    matchScore: 89,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    isFavorite: false,
    expectedSalary: '$150,000 / yr',
    noticePeriod: '1 Month',
    summary: 'Researcher with 4 publications at MICCAI and CVPR focusing on 3D volumetric segmentation of MRI/CT scans with attention-based transformers.'
  },
  {
    id: 'app-5',
    applicantId: 'APP-9025',
    name: 'Karthik Balakrishnan',
    email: 'karthik.b@devopszen.io',
    phone: '+91 94441 90812',
    currentDesignation: 'Lead SRE & Platform Architect',
    location: 'Chennai, India',
    experienceYears: 8,
    skills: ['ArgoCD', 'Prometheus', 'Helm', 'GCP', 'Linux Kernel', 'Chaos Engineering', 'Terraform'],
    source: 'Vendor Partner',
    status: 'Offered',
    assignedRecruiter: 'Priya Sharma',
    assignedJobId: 'job-4',
    assignedJobTitle: 'DevOps & Site Reliability Engineer Lead',
    matchScore: 92,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250',
    isFavorite: true,
    expectedSalary: '₹38 LPA',
    noticePeriod: '15 Days (Buyout possible)',
    summary: 'CloudScale Enterprises extended formal offer letter on Nov 03. Rate negotiated at $115/hr billing.'
  },
  {
    id: 'app-6',
    applicantId: 'APP-9026',
    name: 'Nora Al-Mansoor',
    email: 'nora.mansoor@gulftech.ae',
    phone: '+971 50 892 1144',
    currentDesignation: 'Senior Backend Go Developer',
    location: 'Dubai & Bengaluru',
    experienceYears: 5,
    skills: ['Go', 'gRPC', 'PostgreSQL', 'Redis', 'Kafka', 'Microservices'],
    source: 'LinkedIn',
    status: 'New',
    assignedRecruiter: 'Priya Sharma',
    assignedJobId: 'job-1',
    assignedJobTitle: 'Staff Distributed Systems Engineer (Rust / Go)',
    matchScore: 84,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    isFavorite: false,
    expectedSalary: '$120,000',
    noticePeriod: '30 Days',
    summary: 'Specialized in high-concurrency event-driven processing microservices with Kafka partitions and Postgres write-ahead logs.'
  },
  {
    id: 'app-7',
    applicantId: 'APP-9027',
    name: 'Tariq O\'Connor',
    email: 'tariq.oc@dublincloud.ie',
    phone: '+353 1 496 0123',
    currentDesignation: 'Cloud Platform Architect',
    location: 'Dublin, Ireland',
    experienceYears: 10,
    skills: ['AWS', 'Kubernetes', 'Terraform', 'MLOps', 'vLLM', 'Golang'],
    source: 'Direct Career Portal',
    status: 'Hired',
    assignedRecruiter: 'Marcus Vance',
    assignedJobId: 'job-2',
    assignedJobTitle: 'Principal Cloud AI Architect (AWS / Kubernetes)',
    matchScore: 95,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    isFavorite: true,
    expectedSalary: '€135,000',
    noticePeriod: 'Complete',
    summary: 'Successfully placed at CloudScale Enterprises on Oct 15, 2026. Onboarding completed with stellar feedback.'
  }
];

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'ven-1',
    vendorId: 'VEN-501',
    name: 'TekStaff Global Solutions',
    category: 'Tier-1 IT Staffing & Sourcing',
    contactPerson: 'Arun Mehra',
    email: 'arun@tekstaffglobal.com',
    phone: '+1 (201) 482-9011',
    complianceStatus: 'Verified',
    rating: 4.8,
    activeCandidates: 28,
    status: 'Active'
  },
  {
    id: 'ven-2',
    vendorId: 'VEN-502',
    name: 'Magna Staffing Associates',
    category: 'Specialized Cloud & AI Talent',
    contactPerson: 'Christine Bauer',
    email: 'c.bauer@magnastaff.de',
    phone: '+49 89 2030 4050',
    complianceStatus: 'Verified',
    rating: 4.6,
    activeCandidates: 19,
    status: 'Active'
  },
  {
    id: 'ven-3',
    vendorId: 'VEN-503',
    name: 'CodeForce Consulting India',
    category: 'Contract Sourcing & Offshore Labs',
    contactPerson: 'Sunil Rao',
    email: 's.rao@codeforce-in.com',
    phone: '+91 80 4112 8900',
    complianceStatus: 'Pending Review',
    rating: 4.2,
    activeCandidates: 12,
    status: 'Active'
  }
];

export const INITIAL_INTERVIEWS: Interview[] = [
  {
    id: 'int-1',
    applicantId: 'app-1',
    applicantName: 'Ananya Deshmukh',
    jobId: 'job-2',
    jobTitle: 'Principal Cloud AI Architect (AWS / Kubernetes)',
    client: 'CloudScale Enterprises',
    interviewer: 'David Chen (VP Engineering)',
    date: '2026-11-06',
    time: '14:00 - 15:30 PST',
    type: 'Architecture Deep-Dive',
    status: 'Scheduled',
    meetingLink: 'https://meet.google.com/ais-cloudscale-deepdive',
    rating: 5,
    feedback: 'Scheduled for round 2 architectural scenario presentation.'
  },
  {
    id: 'int-2',
    applicantId: 'app-3',
    applicantName: 'Vikramaditya Roy',
    jobId: 'job-1',
    jobTitle: 'Staff Distributed Systems Engineer (Rust / Go)',
    client: 'NovaPay Distributed Systems',
    interviewer: 'Vikram Seth & Systems Bar Raiser',
    date: '2026-11-07',
    time: '10:30 - 11:45 IST',
    type: 'Technical Screen',
    status: 'Scheduled',
    meetingLink: 'https://meet.google.com/novapay-rust-core',
    rating: 4
  },
  {
    id: 'int-3',
    applicantId: 'app-2',
    applicantName: 'Devon Sterling',
    jobId: 'job-3',
    jobTitle: 'Senior Full Stack Lead (React, Node.js, TypeScript)',
    client: 'FinEdge Global Capital',
    interviewer: 'Samantha Miller (Managing Director)',
    date: '2026-10-31',
    time: '16:00 - 17:00 EST',
    type: 'Hiring Manager',
    status: 'Completed',
    meetingLink: 'https://meet.google.com/finedge-exec-screen',
    rating: 5,
    feedback: 'Outstanding cultural fit and clarity on enterprise trading systems.'
  }
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-1',
    submissionId: 'SUB-8801',
    applicantId: 'app-1',
    applicantName: 'Ananya Deshmukh',
    jobId: 'job-2',
    jobTitle: 'Principal Cloud AI Architect',
    client: 'CloudScale Enterprises',
    recruiter: 'Priya Sharma',
    submittedDate: '2026-10-27',
    billRate: 165,
    payRate: 125,
    status: 'Interview Requested',
    approvalStatus: 'Approved'
  },
  {
    id: 'sub-2',
    submissionId: 'SUB-8802',
    applicantId: 'app-3',
    applicantName: 'Vikramaditya Roy',
    jobId: 'job-1',
    jobTitle: 'Staff Distributed Systems Engineer',
    client: 'NovaPay Distributed Systems',
    recruiter: 'Priya Sharma',
    submittedDate: '2026-10-29',
    billRate: 145,
    payRate: 110,
    status: 'Submitted to Client',
    approvalStatus: 'Approved'
  },
  {
    id: 'sub-3',
    submissionId: 'SUB-8803',
    applicantId: 'app-6',
    applicantName: 'Nora Al-Mansoor',
    jobId: 'job-1',
    jobTitle: 'Staff Distributed Systems Engineer',
    client: 'NovaPay Distributed Systems',
    recruiter: 'Priya Sharma',
    submittedDate: '2026-11-04',
    billRate: 130,
    payRate: 98,
    status: 'Client Review',
    approvalStatus: 'Pending Approval'
  }
];

export const INITIAL_PLACEMENTS: Placement[] = [
  {
    id: 'plc-1',
    placementId: 'PLC-3301',
    applicantName: 'Tariq O\'Connor',
    jobTitle: 'Principal Cloud AI Architect',
    client: 'CloudScale Enterprises',
    recruiter: 'Marcus Vance',
    startDate: '2026-10-15',
    endDate: '2027-10-14',
    billRate: 170,
    payRate: 128,
    margin: 24.7,
    status: 'Active'
  },
  {
    id: 'plc-2',
    placementId: 'PLC-3302',
    applicantName: 'Sarah Chen',
    jobTitle: 'Lead Quantitative Analyst',
    client: 'FinEdge Global Capital',
    recruiter: 'Rajesh Ramanathan',
    startDate: '2026-08-01',
    endDate: '2027-07-31',
    billRate: 195,
    payRate: 145,
    margin: 25.6,
    status: 'Active'
  },
  {
    id: 'plc-3',
    placementId: 'PLC-3303',
    applicantName: 'Rahul Varma',
    jobTitle: 'Data Platform Architect',
    client: 'NovaPay Distributed Systems',
    recruiter: 'Priya Sharma',
    startDate: '2026-06-15',
    endDate: '2027-06-14',
    billRate: 140,
    payRate: 105,
    margin: 25.0,
    status: 'Active'
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'tsk-1',
    title: 'Confirm Technical Round 2 panel for Ananya Deshmukh',
    dueDate: '2026-11-06',
    priority: 'Urgent',
    assignedTo: 'Priya Sharma',
    status: 'In Progress',
    category: 'Interview Follow-up'
  },
  {
    id: 'tsk-2',
    title: 'Review and release formal offer letter for Devon Sterling',
    dueDate: '2026-11-07',
    priority: 'High',
    assignedTo: 'Marcus Vance',
    status: 'Pending',
    category: 'Offer Release'
  },
  {
    id: 'tsk-3',
    title: 'Audit compliance certificate for CodeForce Consulting India',
    dueDate: '2026-11-10',
    priority: 'Medium',
    assignedTo: 'Elena Rostova',
    status: 'Pending',
    category: 'Vendor Verification'
  },
  {
    id: 'tsk-4',
    title: 'Approve Nora Al-Mansoor submission for NovaPay Systems',
    dueDate: '2026-11-05',
    priority: 'High',
    assignedTo: 'Rajesh Ramanathan',
    status: 'Pending',
    category: 'Client Review'
  }
];

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-1',
    user: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    action: 'scheduled Round 2 interview for',
    target: 'Ananya Deshmukh with CloudScale VP',
    timestamp: '18 minutes ago',
    type: 'interview'
  },
  {
    id: 'act-2',
    user: 'Marcus Vance',
    avatar: '/src/assets/images/candidate_profile_marcus_1793866558379.jpg',
    action: 'moved candidate to Selected status:',
    target: 'Devon Sterling for FinEdge Capital',
    timestamp: '1 hour ago',
    type: 'applicant'
  },
  {
    id: 'act-3',
    user: 'Rajesh Ramanathan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    action: 'approved client submission of',
    target: 'Vikramaditya Roy to NovaPay Systems',
    timestamp: '3 hours ago',
    type: 'submission'
  },
  {
    id: 'act-4',
    user: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    action: 'configured enterprise SLA tier for client:',
    target: 'CloudScale Enterprises',
    timestamp: '5 hours ago',
    type: 'job'
  }
];
