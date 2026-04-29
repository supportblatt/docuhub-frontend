export const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Clients', href: '/clients' },
  { label: 'Forms', href: '/forms' },
  { label: 'Submissions', href: '/submissions' },
  { label: 'ABN Tracking', href: '/abn-tracking' },
  { label: 'Documents', href: '/documents' },
  { label: 'Reports', href: '/reports' },
  { label: 'Settings', href: '/settings' }
] as const;

export const dashboardStats = [
  { label: 'Total Clients', value: '248', delta: '+12% this month' },
  { label: 'Forms Sent', value: '142', delta: '+8 this week' },
  { label: 'In Progress', value: '34', delta: '24 viewed' },
  { label: 'Submitted', value: '89', delta: '+15 today' },
  { label: 'Needs Review', value: '12', delta: '3 urgent' },
  { label: 'Ready to Forward', value: '28', delta: '5 this week' },
  { label: 'Awaiting ABN', value: '16', delta: '8 submitted' },
  { label: 'Completed This Month', value: '67', delta: '+24% vs last month' }
] as const;

export const clients = [
  {
    id: 'APP-1247',
    name: 'Jordin Rose Mackay',
    clientNames: ['Jordin Rose Mackay', 'Jordin Rose Negfeldt'],
    email: 'sarah.mitchell@email.com',
    phone: '0412 345 678',
    smsf: 'J & J Mackay Property #1',
    formType: 'Company Establishment',
    company: 'Mitchell Trustee Pty Ltd',
    status: 'Submitted',
    abnStatus: 'Awaiting ABN',
    staff: 'Sarah',
    lastActivity: '2 hours ago'
  },
  {
    id: 'APP-1246',
    name: 'Robert Leslie Fraser',
    clientNames: ['Robert Leslie Fraser'],
    email: 'david.thompson@email.com',
    phone: '0423 456 789',
    smsf: 'RNE19 Super Fund',
    formType: 'SMSF Borrowing (Bare Trust)',
    company: 'DT Trustee Co Pty Ltd',
    status: 'Needs Review',
    abnStatus: 'Pending Review',
    staff: 'Vanessa',
    lastActivity: '5 hours ago'
  },
  {
    id: 'APP-1245',
    name: 'Melanie Elizabeth Dowling',
    clientNames: ['Melanie Elizabeth Dowling', 'Adrian Ian Dowling'],
    email: 'jen.wong@email.com',
    phone: '0434 567 890',
    smsf: 'Dowling Super Fund',
    formType: 'SMSF Borrowing (Bare Trust)',
    company: '-',
    status: 'In Progress',
    abnStatus: 'Not Applicable',
    staff: 'Lauren',
    lastActivity: '1 day ago'
  },
  {
    id: 'APP-1244',
    name: 'Tacy-Lee Taylor',
    clientNames: ['Tacy-Lee Taylor'],
    email: 'm.roberts@email.com',
    phone: '0445 678 901',
    smsf: 'Taylormade #9',
    formType: 'SMSF + Corporate Trustee',
    company: 'Roberts Trustees Pty Ltd',
    status: 'Ready to Forward',
    abnStatus: 'ABN Received',
    staff: 'John',
    lastActivity: '1 day ago'
  },
  {
    id: 'APP-1243',
    name: 'Robert Leslie Fraser',
    clientNames: ['Robert Leslie Fraser'],
    email: 'lisa.anderson@email.com',
    phone: '0456 789 012',
    smsf: 'RNE19 Super Fund',
    formType: 'SMSF Borrowing (Bare Trust)',
    company: 'Anderson Corp Trustee Pty Ltd',
    status: 'Missing Information',
    abnStatus: 'Not Provided',
    staff: 'Stacey',
    lastActivity: '2 days ago'
  },
  {
    id: 'APP-1242',
    name: 'Melanie Elizabeth Dowling',
    clientNames: ['Melanie Elizabeth Dowling', 'Adrian Ian Dowling'],
    email: 'james.wilson@email.com',
    phone: '0467 890 123',
    smsf: 'Dowling Super Fund',
    formType: 'SMSF Borrowing (Bare Trust)',
    company: '-',
    status: 'Form Sent',
    abnStatus: 'Not Applicable',
    staff: 'Vanessa',
    lastActivity: '3 days ago'
  }
] as const;

export const forms = [
  {
    formId: 'FORM-1247',
    client: 'Jordin Rose Mackay',
    email: 'sarah.mitchell@email.com',
    type: 'Company Establishment',
    status: 'Submitted',
    sent: 'April 23, 2026',
    due: 'May 7, 2026',
    activity: '2 hours ago',
    staff: 'Sarah'
  },
  {
    formId: 'FORM-1246',
    client: 'Robert Leslie Fraser',
    email: 'david.thompson@email.com',
    type: 'SMSF Borrowing (Bare Trust)',
    status: 'Needs Review',
    sent: 'April 22, 2026',
    due: 'May 6, 2026',
    activity: '5 hours ago',
    staff: 'Vanessa'
  },
  {
    formId: 'FORM-1245',
    client: 'Melanie Elizabeth Dowling',
    email: 'jen.wong@email.com',
    type: 'SMSF Borrowing (Bare Trust)',
    status: 'In Progress',
    sent: 'April 21, 2026',
    due: 'May 5, 2026',
    activity: '1 day ago',
    staff: 'Lauren'
  },
  {
    formId: 'FORM-1244',
    client: 'Tacy-Lee Taylor',
    email: 'm.roberts@email.com',
    type: 'SMSF + Corporate Trustee',
    status: 'Ready to Forward',
    sent: 'April 20, 2026',
    due: 'May 4, 2026',
    activity: '1 day ago',
    staff: 'John'
  }
] as const;

export const submissions = [
  {
    id: 'APP-1247',
    client: 'Sarah Mitchell',
    smsf: 'Mitchell Family Super Fund',
    formType: 'SMSF + Corporate Trustee',
    status: 'Submitted',
    submittedDate: 'April 24, 2026 2:30 PM',
    completeness: 100,
    issues: 'No issues',
    staff: 'Alex Chen'
  },
  {
    id: 'APP-1246',
    client: 'David Thompson',
    smsf: 'Thompson Retirement Fund',
    formType: 'SMSF + Corporate Trustee',
    status: 'Needs Review',
    submittedDate: 'April 23, 2026 4:15 PM',
    completeness: 100,
    issues: '1 issue',
    staff: 'Emma Davis'
  },
  {
    id: 'APP-1244',
    client: 'Michael Roberts',
    smsf: 'Roberts Family SMSF',
    formType: 'Existing Corporate Trustee',
    status: 'Ready to Forward',
    submittedDate: 'April 22, 2026 10:20 AM',
    completeness: 100,
    issues: 'No issues',
    staff: 'Sarah Park'
  },
  {
    id: 'APP-1243',
    client: 'Lisa Anderson',
    smsf: 'Anderson Superannuation Fund',
    formType: 'SMSF + Corporate Trustee',
    status: 'Missing Information',
    submittedDate: 'April 21, 2026 3:45 PM',
    completeness: 85,
    issues: '3 issues',
    staff: 'Emma Davis'
  },
  {
    id: 'APP-1241',
    client: 'Emma Taylor',
    smsf: 'Taylor Family Fund',
    formType: 'SMSF + Corporate Trustee',
    status: 'Completed',
    submittedDate: 'April 18, 2026 11:30 AM',
    completeness: 100,
    issues: 'No issues',
    staff: 'Sarah Park'
  }
] as const;

export const abnItems = [
  {
    id: 'APP-1247',
    client: 'Sarah Mitchell',
    smsf: 'Mitchell Family Super Fund',
    required: 'Yes',
    status: 'Awaiting ABN',
    govDate: 'April 20, 2026',
    updated: '2 days ago',
    staff: 'Alex Chen',
    nextAction: 'Enter ABN'
  },
  {
    id: 'APP-1246',
    client: 'David Thompson',
    smsf: 'Thompson Retirement Fund',
    required: 'Yes',
    status: 'Submitted to Government',
    govDate: 'April 18, 2026',
    updated: '4 days ago',
    staff: 'Emma Davis',
    nextAction: 'View'
  },
  {
    id: 'APP-1244',
    client: 'Michael Roberts',
    smsf: 'Roberts Family SMSF',
    required: 'Yes',
    status: 'ABN Received',
    govDate: 'April 10, 2026',
    updated: '12 days ago',
    staff: 'Sarah Park',
    nextAction: 'View'
  },
  {
    id: 'APP-1243',
    client: 'Lisa Anderson',
    smsf: 'Anderson Superannuation Fund',
    required: 'Unsure / To be confirmed',
    status: 'Pending Review',
    govDate: '-',
    updated: '5 days ago',
    staff: 'Emma Davis',
    nextAction: 'View'
  },
  {
    id: 'APP-1240',
    client: 'Robert Chang',
    smsf: 'Chang Super Fund',
    required: 'Yes',
    status: 'Not Submitted',
    govDate: '-',
    updated: '1 day ago',
    staff: 'Alex Chen',
    nextAction: 'Mark Submitted'
  }
] as const;

export const documents = [
  {
    name: 'Mitchell Application Summary.pdf',
    client: 'Sarah Mitchell',
    appId: 'APP-1247',
    type: 'Client Summary',
    by: 'Alex Chen',
    uploaded: 'April 24, 2026',
    size: '245 KB'
  },
  {
    name: 'Roberts ABN Confirmation.pdf',
    client: 'Michael Roberts',
    appId: 'APP-1244',
    type: 'ABN Confirmation',
    by: 'Sarah Park',
    uploaded: 'April 22, 2026',
    size: '128 KB'
  },
  {
    name: 'Thompson Declaration.pdf',
    client: 'David Thompson',
    appId: 'APP-1246',
    type: 'Signed Declaration',
    by: 'System',
    uploaded: 'April 23, 2026',
    size: '189 KB'
  },
  {
    name: 'Anderson ID Documents.zip',
    client: 'Lisa Anderson',
    appId: 'APP-1243',
    type: 'Supporting Document',
    by: 'Emma Davis',
    uploaded: 'April 20, 2026',
    size: '3.2 MB'
  },
  {
    name: 'Wilson Application Form.pdf',
    client: 'James Wilson',
    appId: 'APP-1242',
    type: 'Client Summary',
    by: 'Alex Chen',
    uploaded: 'April 19, 2026',
    size: '312 KB'
  }
] as const;
