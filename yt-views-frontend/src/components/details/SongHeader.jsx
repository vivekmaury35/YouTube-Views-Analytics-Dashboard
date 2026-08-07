import { formatViews } from '../../utils/formatters';

const SongHeader = ({ thumbnail, title, currentViews, lastUpdate }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-border shadow-sm flex flex-col md:flex-row items-center gap-6 justify-between mb-8">
      {/* LEFT - Context */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 w-full md:w-auto">
        <div className="w-24 sm:w-[100px] aspect-video rounded-md overflow-hidden shrink-0 bg-gray-100 border border-gray-200 shadow-sm">
          <img src={thumbnail} alt="Thumbnail view" className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-secondary tracking-tight font-medium text-lg leading-snug line-clamp-2 md:max-w-md">
            {title}
          </h1>
          {lastUpdate && (
            <p className="text-gray-400 text-sm mt-1 sm:mt-2">
              Update Time: {lastUpdate}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT - KPI */}
      <div className="w-full md:w-auto flex flex-col items-center">
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Current Views</span>
          <span className="text-5xl sm:text-6xl font-bold text-primary tabular-nums tracking-tight">
            {formatViews(currentViews)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SongHeader;
