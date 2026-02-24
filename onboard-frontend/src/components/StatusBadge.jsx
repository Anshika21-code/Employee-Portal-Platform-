// export default function StatusBadge({ status }) {
//     const getStatusStyles = () => {
//       switch (status) {
//         case 'Completed':
//           return 'bg-green-100 text-green-800';
//         case 'In Progress':
//           return 'bg-yellow-100 text-yellow-800';
//         case 'Not Started':
//           return 'bg-gray-100 text-gray-800';
//         case 'on-track':
//           return 'bg-green-100 text-green-800';
//         case 'at-risk':
//           return 'bg-yellow-100 text-yellow-800';
//         case 'delayed':
//           return 'bg-red-100 text-red-800';
//         default:
//           return 'bg-gray-100 text-gray-800';
//       }
//     };
  
//     return (
//       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles()}`}>
//         {status}
//       </span>
//     );
//   } 

export default function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'Not Started':
        return 'bg-gray-100 text-gray-700';
      case 'Top 15%':
        return 'bg-green-100 text-green-700';
      case 'Mid':
        return 'bg-blue-100 text-blue-700';
      case 'Low':
        return 'bg-gray-200 text-gray-700';
      case 'At Risk':
        return 'bg-yellow-100 text-yellow-700';
      case 'Delayed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
}
