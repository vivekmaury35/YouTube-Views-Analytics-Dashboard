import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SongsPage from './pages/SongsPage';
import SongDetailsPage from './pages/SongDetailsPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<SongsPage />} />
          <Route path="/songs" element={<SongsPage />} />
          <Route path="/songs/:videoId" element={<SongDetailsPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
