import { MonitorPlay } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center bg-white rounded-xl border border-border shadow-sm">
      <div className="bg-gray-50 text-gray-400 p-6 rounded-full mb-5">
        <MonitorPlay size={48} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-medium text-primary mb-2">No monitored songs found.</h3>
      <p className="text-secondary">Add videos to your tracking list to see them here.</p>
    </div>
  );
};

export default EmptyState;
