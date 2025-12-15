export default function StatusBadge({ status }) {
    const getStatusStyles = () => {
      switch (status) {
        case 'Completed':
          return 'bg-green-100 text-green-800';
        case 'In Progress':
          return 'bg-yellow-100 text-yellow-800';
        case 'Not Started':
          return 'bg-gray-100 text-gray-800';
        case 'on-track':
          return 'bg-green-100 text-green-800';
        case 'at-risk':
          return 'bg-yellow-100 text-yellow-800';
        case 'delayed':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
  
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles()}`}>
        {status}
      </span>
    );
  }