import { useNavigate } from 'react-router-dom';

const SongCard = ({ videoId, title, thumbnail }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/songs/${videoId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-[12px] overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col h-full group"
    >
      <div className="w-full aspect-video overflow-hidden relative bg-gray-100">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <h3 className="text-primary font-medium text-base leading-snug line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default SongCard;
