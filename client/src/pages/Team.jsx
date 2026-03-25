import { useState, useMemo } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import TeamCard from '../features/employee dashboard/components/TeamCard';
import { useAnalytics } from '../context/AnalyticsContext';

const DEPARTMENTS = ['All Departments', 'Engineering', 'Design', 'Marketing', 'Sales'];

export default function Team() {
  const { users: teamMembers } = useAnalytics();
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('All Departments');
  const [selectedMember, setSelectedMember] = useState(null);
  
  const filtered = useMemo(() => {
    return teamMembers.filter((m) => {
      const matchName = m.name.toLowerCase().includes(query.toLowerCase());
      const matchDept = dept === 'All Departments' || m.department === dept;
      return matchName && matchDept;
    });
  }, [query, dept]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-8 w-full">
        <div className="mb-7">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Team</h1>
          <p className="text-gray-500 mt-1.5 font-medium">Meet your amazing team members</p>
        </div>
        <div className="bg-white rounded-2xl px-5 py-4 shadow-sm mb-8 flex items-center gap-4 border border-gray-100">
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
              className="appearance-none border border-gray-200 rounded-xl pl-4 pr-9 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-purple-500 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((member) => (
            <TeamCard 
              key={member.id} 
              member={member} 
              onViewProfile={() => setSelectedMember(member)} 
            />
          ))}
        </div>
      </main>
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedMember(null)} />
          
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="h-28 bg-gradient-to-r from-purple-600 to-indigo-600" />
            <button 
              onClick={() => setSelectedMember(null)} 
              className="absolute top-4 right-4 p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors cursor-pointer"
            >
              <X size={20} className="text-white" />
            </button>
            
            <div className="px-8 pb-8">
              <div className="-mt-14 mb-4">
                <img 
                  src={selectedMember.avatar} 
                  alt={selectedMember.name} 
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl bg-white" 
                />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h2>
              <p className="text-purple-600 font-semibold">{selectedMember.role}</p>
              
              <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-slate-900">Department:</span> {selectedMember.department}
                </p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4 mb-3">Performance Stats</p>
                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                  <span className="text-sm">🎉 {selectedMember.shoutOuts} Shout-Outs</span>
                  <div className="w-px h-4 bg-slate-200" />
                  <span className="text-sm">👏 {selectedMember.claps} Claps</span>
                  <div className="w-px h-4 bg-slate-200" />
                  <span className="text-sm">⭐ {selectedMember.stars} Stars</span>
                </div>
              </div> {/* <-- Fixed: Closed Stats inner box */}
            </div> {/* <-- Fixed: Closed Modal content padding wrapper */}
          </div> {/* <-- Fixed: Closed Modal relative container */}
        </div> 
      )}
    </div>
  );
}