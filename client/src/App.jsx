import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./features/employeeDashboard/components/Sidebar";
import TopNavbar from "./features/employeeDashboard/components/TopNavbar";

import SummaryCards from "./features/employeeDashboard/components/SummaryCards";

import AchievementTable from "./features/employeeDashboard/components/AchievementTable";

import Leaderboard from "./features/employeeDashboard/components/Leaderboard";

import { AnimatePresence, motion } from "framer-motion";

const EmployeeDashboard = () => {
  return (
   <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopNavbar />

        <main className="flex-1 p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-700">
              Welcome to BragBoard 🚀
            </h2>
              <AnimatePresence mode="wait">
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SummaryCards />
                  <AchievementTable />
                  <Leaderboard />
                </motion.div>
              </AnimatePresence>
        </main>
      </div>

    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;