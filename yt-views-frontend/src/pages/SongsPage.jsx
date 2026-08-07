import { useState, useEffect } from 'react';
import SongCard from '../components/dashboard/SongCard';
import { CardSkeleton } from '../components/common/LoadingSkeleton';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import { fetchSongs } from '../services/api';

const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSongs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchSongs();
      setSongs(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch monitored songs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSongs();
  }, []);

  if (error) {
    return (
      <div className="pt-8">
        <ErrorState message={error} onRetry={loadSongs} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-[28px] font-semibold text-primary tracking-tight">
          Monitored Songs
        </h1>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : songs.length === 0 ? (
        <div className="pt-8">
          <EmptyState />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {songs.map((song) => (
            <SongCard
              key={song.video_id}
              videoId={song.video_id}
              title={song.title}
              thumbnail={song.thumbnail}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SongsPage;
