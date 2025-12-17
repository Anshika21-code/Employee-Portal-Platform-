export default function ProgressBar({ percentage }) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-500 flex items-center justify-center text-xs text-white font-semibold"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 15 && `${percentage}%`}
        </div>
      </div>
    );
  }
  