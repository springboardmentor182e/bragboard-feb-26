import { BrowserRouter, Routes, Route } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home route */}
        <Route path="/" element={<Leaderboard />} />

        {/* Leaderboard route */}
        <Route path="/leaderboard" element={<Leaderboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;