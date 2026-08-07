import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-navbar sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-500 transition-colors">
              <Activity size={20} className="text-white" />
            </div>
            <span className="text-white font-medium text-lg tracking-wide">YTAnalysis</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
