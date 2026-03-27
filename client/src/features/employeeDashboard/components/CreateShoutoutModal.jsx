import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, Search, Heart, Star, Zap, Rocket, Puzzle, ShieldCheck, Image as ImageIcon, FileText, Sparkles, Loader2 } from "lucide-react";

const CreateShoutoutModal = ({ isOpen, onClose }) => {
  const [teammateSearch, setTeammateSearch] = useState("");
  const [selectedTeammate, setSelectedTeammate] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [showDropdown, setShowTeammateDropdown] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Alex Cooper is our current user (ID 8)
  const currentUserId = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await axios.get(`${apiUrl}/users/`);
        const users = Array.isArray(response.data) ? response.data : [];
        setAllUsers(users.filter(u => u.id !== currentUserId));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    if (isOpen) fetchUsers();
  }, [isOpen]);

  const handleClose = () => {
    setTeammateSearch("");
    setSelectedTeammate(null);
    setSelectedBadge(null);
    setSelectedCampaign(null);
    setMessage("");
    onClose();
  };

  const handleSend = async () => {
    if (!isFormValid) return;
    setIsSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      await axios.post(`${apiUrl}/shoutouts/`, {
        sender_id: currentUserId,
        receiver_id: selectedTeammate.id,
        message: message,
        category: selectedBadge.label,
        points: 50 // Default points
      });
      handleClose();
      // Optional: Show success toast or refresh feed
    } catch (error) {
      console.error("Error sending shoutout:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const isFormValid = selectedTeammate !== null && selectedBadge !== null && message.trim() !== "" && !isSubmitting;

  const badges = [
    { id: "team-player", label: "Team Player", desc: "Exceptional collaboration", icon: <Heart className="text-orange-400 fill-orange-400" size={20} /> },
    { id: "innovation-star", label: "Innovation Star", desc: "Creative problem solving", icon: <Star className="text-yellow-400 fill-yellow-400" size={20} /> },
    { id: "customer-champion", label: "Customer Champion", desc: "Outstanding service", icon: <Zap className="text-orange-600 fill-orange-600" size={20} /> },
    { id: "data-wizard", label: "Data Wizard", desc: "Insights & analytics", icon: <ShieldCheck className="text-blue-500" size={20} /> },
    { id: "problem-solver", label: "Problem Solver", desc: "Quick thinking", icon: <Puzzle className="text-green-500" size={20} /> },
    { id: "above-beyond", label: "Going Above & Beyond", desc: "Extra mile effort", icon: <Rocket className="text-indigo-500" size={20} /> },
  ];

  const campaigns = [
    { id: "q1-recognition", label: "Q1 Recognition Rally", desc: "Recognize teammates who go above and beyond this quarter", points: "2x Points" },
    { id: "innovation-week", label: "Innovation Week", desc: "Celebrate creative solutions and innovative ideas", points: "2x Points" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-8 pb-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Create a Shout-Out</h2>
            <p className="text-slate-500 font-medium mt-1">Recognize your teammates for their great work</p>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors p-2">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-8 scrollbar-hide">
          
          {/* Who deserves recognition */}
          <div className="space-y-3 relative">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-1">
              Who deserves recognition? <span className="text-rose-500">*</span>
            </label>
            {selectedTeammate ? (
              <div className="flex items-center justify-between p-4 rounded-2xl border border-indigo-100 bg-indigo-50/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                    {selectedTeammate.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{selectedTeammate.name}</div>
                    <div className="text-[11px] font-medium text-slate-500">{selectedTeammate.department}</div>
                  </div>
                </div>
                <button onClick={() => setSelectedTeammate(null)} className="text-slate-400 hover:text-rose-500 transition-colors">
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  value={teammateSearch}
                  onChange={(e) => {
                    setTeammateSearch(e.target.value);
                    setShowTeammateDropdown(true);
                  }}
                  onFocus={() => setShowTeammateDropdown(true)}
                  placeholder="Search and select teammates..." 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium"
                />
                
                {showDropdown && teammateSearch.trim() !== "" && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-10 max-h-60 overflow-y-auto scrollbar-hide py-2">
                    {allUsers
                      .filter(u => u.name.toLowerCase().includes(teammateSearch.toLowerCase()))
                      .map(user => (
                        <button
                          key={user.id}
                          onClick={() => {
                            setSelectedTeammate(user);
                            setShowTeammateDropdown(false);
                            setTeammateSearch("");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">{user.name}</div>
                            <div className="text-[10px] font-medium text-slate-400">{user.department}</div>
                          </div>
                        </button>
                      ))}
                  </div>
                )}
              </div>
            )}
            <p className="text-xs font-medium text-slate-400">You can select one teammate</p>
          </div>

          {/* Choose a recognition badge */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-1">
              Choose a recognition badge <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {badges.map((badge) => (
                <button
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                    selectedBadge?.id === badge.id 
                      ? "border-yellow-400 bg-yellow-50/30 ring-4 ring-yellow-400/5" 
                      : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    {badge.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{badge.label}</div>
                    <div className="text-[11px] font-medium text-slate-400">{badge.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Link to Campaign */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-900">
              Link to Campaign <span className="text-slate-400 font-medium">(optional)</span>
            </label>
            <div className="space-y-3">
              {campaigns.map((camp) => (
                <button
                  key={camp.id}
                  onClick={() => setSelectedCampaign(camp.id)}
                  className={`w-full flex items-start gap-4 p-5 rounded-[24px] border transition-all text-left ${
                    selectedCampaign === camp.id 
                      ? "border-indigo-200 bg-indigo-50/30 ring-4 ring-indigo-500/5" 
                      : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="mt-1">
                    <Sparkles className="text-slate-400" size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-900">{camp.label}</div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5">{camp.desc}</div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-wider mt-3">
                      <Sparkles size={10} className="fill-orange-600" />
                      {camp.points}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Your message */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-1">
              Your message <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share why this person deserves recognition... Be specific about what they did and how it made an impact!" 
                className="w-full h-32 p-5 rounded-3xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium resize-none"
              ></textarea>
              <div className="flex justify-between mt-3 px-1">
                <span className={`text-[11px] font-bold ${message.length > 500 ? "text-rose-500" : "text-slate-400"}`}>
                  {message.length} / 500 characters
                </span>
                {message.length < 20 && message.length > 0 && (
                  <span className="text-[11px] font-bold text-orange-500">Add more details for a meaningful shout-out</span>
                )}
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-900">
              Attachments <span className="text-slate-400 font-medium">(optional)</span>
            </label>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-sm font-bold text-slate-700 transition-all">
                <ImageIcon size={18} className="text-slate-400" />
                Add Image
              </button>
              <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-sm font-bold text-slate-700 transition-all">
                <FileText size={18} className="text-slate-400" />
                Add File
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 pt-4 border-t border-slate-50 flex gap-4 bg-white">
          <button 
            onClick={handleClose}
            className="flex-1 py-4 rounded-2xl border border-slate-200 text-sm font-black text-slate-700 hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSend}
            disabled={!isFormValid}
            className={`flex-[1.5] py-4 rounded-2xl text-white text-sm font-black shadow-lg transition-all flex items-center justify-center gap-2 ${
              isFormValid 
                ? "bg-[#5B59FF] shadow-indigo-500/20 hover:opacity-90" 
                : "bg-slate-400 shadow-none cursor-not-allowed opacity-60"
            }`}
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Send Shout-Out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateShoutoutModal;