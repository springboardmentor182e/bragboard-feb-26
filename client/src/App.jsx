import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShoutoutProvider } from './context/ShoutoutContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Team from './pages/Team';
import Badges from './pages/Badges';

function App() {
  return (
    <AnalyticsProvider>
      <ShoutoutProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/team"        element={<Team />} />
            <Route path="/badges"      element={<Badges />} />
          </Routes>
        </BrowserRouter>
      </ShoutoutProvider>
    </AnalyticsProvider>
  );
}

export default App;

