import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // FastAPI backend URL
  timeout: 10000,
});

export const fetchSongs = async () => {
  try {
    const res = await api.get('/songs');
    return res.data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw error;
  }
};

export const fetchSongDetails = async (videoId) => {
  try {
    const res = await api.get(`/songs/${videoId}`);
    const song = res.data;

    // Make sure we format the last_update safely if it exists
    let formattedLastUpdate = null;
    if (song.last_update) {
      // Python's datetime.utcnow() doesn't add 'Z', so we append it to force UTC parsing
      const timeString = song.last_update.endsWith('Z') ? song.last_update : `${song.last_update}Z`;
      const date = new Date(timeString);
      if (!isNaN(date.getTime())) {
         formattedLastUpdate = date.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
      } else {
         formattedLastUpdate = song.last_update;
      }
    }

    return {
      ...song,
      current_views: song.current_views,
      last_update: formattedLastUpdate
    };
  } catch (error) {
    console.error(`Error fetching details for ${videoId}:`, error);
    throw error;
  }
};

export const fetchSongHistory = async (videoId, tab) => {
  try {
    // The fast api endpoint takes 'filter' instead of 'tab'
    const res = await api.get(`/songs/${videoId}/history?filter=${tab}`);

    return res.data.map(item => {
      // Format timestamps for the table view
      let formattedTime = item.timestamp;
      try {
         // Force UTC parsing by appending 'Z' if missing since Python issues naive UTC times
         const timeString = item.timestamp.endsWith('Z') ? item.timestamp : `${item.timestamp}Z`;
         const date = new Date(timeString);
         if (!isNaN(date.getTime())) {
           // Format as HH:MM:SS in local timezone (IST)
           formattedTime = date.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
         }
      } catch(e) {
          // ignore
      }

      return {
        timestamp: formattedTime,
        views: item.views,
        gain_loss: item.gain_loss
      };
    });
  } catch (error) {
    console.error(`Error fetching history for ${videoId}:`, error);
    throw error;
  }
};

export default api;
