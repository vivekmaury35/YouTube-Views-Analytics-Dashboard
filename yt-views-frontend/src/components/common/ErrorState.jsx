import { AlertCircle } from 'lucide-react';

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-border shadow-sm">
      <div className="bg-red-50 text-negative p-4 rounded-full mb-4">
        <AlertCircle size={32} />
      </div>
      <h3 className="text-xl font-medium text-primary mb-2">Something went wrong</h3>
      <p className="text-secondary mb-6 max-w-md">{message || "Failed to load data. Please try again later."}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-header text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
