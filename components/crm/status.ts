export function statusTone(status: string): 'green' | 'amber' | 'orange' | 'purple' | 'blue' | 'teal' | 'red' | 'slate' {
  switch (status) {
    case 'Submitted':
    case 'ABN Received':
    case 'No issues':
      return 'green';
    case 'Awaiting ABN':
    case 'Pending Review':
    case 'In Progress':
    case 'Unsure / To be confirmed':
      return 'amber';
    case 'Needs Review':
    case '1 issue':
      return 'orange';
    case 'Viewed by Client':
    case 'Signed Declaration':
    case 'Submitted to Government':
      return 'purple';
    case 'Form Sent':
    case 'Client Summary':
    case 'Completed':
    case 'Yes':
      return 'blue';
    case 'Ready to Forward':
    case 'ABN Confirmation':
      return 'teal';
    case 'Missing Information':
    case '3 issues':
    case 'Not Provided':
      return 'red';
    default:
      return 'slate';
  }
}
