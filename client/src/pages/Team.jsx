import { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Navbar from '../layout/Navbar';
import TeamCard from '../features/employee dashboard/components/TeamCard';
import { teamMembers } from '../data/mockData';

const DEPARTMENTS = ['All Departments', 'Engineering', 'Design', 'Marketing', 'Sales'];

export default function Team() {
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('All Departments');

  const filtered = useMemo(() => {
    return teamMembers.filter((m) => {
      const matchName = m.name.toLowerCase().includes(query.toLowerCase());
      const matchDept = dept === 'All Departments' || m.department === dept;
      return matchName && matchDept;
    });
  }, [query, dept]);

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-4xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-500 mt-1.5">Meet your amazing team members</p>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-2xl px-5 py-4 shadow-sm mb-6 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search team members..."
              className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none bg-transparent"
            />
          </div>
          <div className="relative shrink-0">
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="appearance-none border border-gray-200 rounded-xl pl-4 pr-9 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-primary cursor-pointer"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-3 gap-5">
          {filtered.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </main>
    </div>
  );
}
