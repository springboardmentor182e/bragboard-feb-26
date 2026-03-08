import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Team from './pages/Team';
import Badges from './pages/Badges';
import Analytics from './pages/Analytics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/team"        element={<Team />} />
        <Route path="/badges"      element={<Badges />} />
        <Route path="/analytics"   element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
