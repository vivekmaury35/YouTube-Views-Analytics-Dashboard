import { Download } from 'lucide-react';

const ExportButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-export hover:bg-exportDark transition-colors text-white font-medium py-2 px-5 rounded-md text-[15px] shadow-sm ml-auto"
    >
      <Download size={18} />
      Export
    </button>
  );
};

export default ExportButton;
