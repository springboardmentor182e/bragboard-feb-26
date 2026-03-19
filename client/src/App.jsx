import { Routes, Route } from 'react-router-dom';
import { ShoutoutProvider } from './context/ShoutoutContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import Navbar from './layout/Navbar';
import Sidebar from './layout/Sidebar';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Team from './pages/Team';
import Badges from './pages/Badges';

function App() {
  return (
    <AnalyticsProvider>
      <ShoutoutProvider>
        <Navbar />
        <div className="flex pt-16">
          <Sidebar />
          <main className="flex-1 ml-64">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/team"        element={<Team />} />
              <Route path="/badges"      element={<Badges />} />
            </Routes>
          </main>
        </div>
      </ShoutoutProvider>
    </AnalyticsProvider>
  );
}

export default App;

