import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SongHeader from '../components/details/SongHeader';
import Tabs from '../components/details/Tabs';
import ExportButton from '../components/common/ExportButton';
import HistoryTable from '../components/details/HistoryTable';
import ErrorState from '../components/common/ErrorState';
import { HeaderSkeleton, TableSkeleton } from '../components/common/LoadingSkeleton';
import { fetchSongDetails, fetchSongHistory } from '../services/api';

const SongDetailsPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('today');
  const [details, setDetails] = useState(null);
  const [history, setHistory] = useState([]);

  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  const [errorDetails, setErrorDetails] = useState(null);
  const [errorHistory, setErrorHistory] = useState(null);

  const loadDetails = async () => {
    setIsLoadingDetails(true);
    setErrorDetails(null);
    try {
      const data = await fetchSongDetails(videoId);
      setDetails(data);
    } catch (err) {
      setErrorDetails(err.message || 'Failed to fetch details');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const loadHistory = async (tab) => {
    setIsLoadingHistory(true);
    setErrorHistory(null);
    try {
      const data = await fetchSongHistory(videoId, tab);
      setHistory(data);
    } catch (err) {
      setErrorHistory(err.message || 'Failed to fetch history');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (videoId) {
      loadDetails();
      loadHistory(activeTab);
    }
  }, [videoId]);

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      loadHistory(tab);
    }
  };

  const handleExport = () => {
    // In a real app, logic to generate CSV/Excel here
    console.log(`Exporting data for ${videoId} (${activeTab})`);
    alert('Export functionality would generate a local CSV download here.');
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors text-sm font-medium w-fit mb-5"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      {errorDetails ? (
        <ErrorState message={errorDetails} onRetry={loadDetails} />
      ) : isLoadingDetails ? (
        <HeaderSkeleton />
      ) : details ? (
        <SongHeader
          thumbnail={details.thumbnail}
          title={details.title}
          currentViews={details.current_views}
          lastUpdate={details.last_update}
        />
      ) : null}

      {!errorDetails && !isLoadingDetails && (
        <div className="flex flex-col w-full bg-white rounded-xl border border-border shadow-sm p-4 sm:p-6 mb-8 mt-2">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
            <div className="flex justify-end border-b border-border sm:border-none pb-4 sm:pb-0 relative top-[-14px]">
               <ExportButton onClick={handleExport} />
            </div>
          </div>

          <div className="mt-[-20px] sm:mt-0">
            {errorHistory ? (
              <ErrorState message={errorHistory} onRetry={() => loadHistory(activeTab)} />
            ) : isLoadingHistory ? (
              <TableSkeleton />
            ) : (
              <HistoryTable data={history} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SongDetailsPage;
