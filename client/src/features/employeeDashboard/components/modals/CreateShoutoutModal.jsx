import { X, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { createShoutout, getAllUsers } from "../../../../services/shoutoutService";

// Map badge selection to API categories
const BADGE_CATEGORY_MAP = {
  "Team Player": "Teamwork",
  "Innovation Star": "Innovation",
  "Customer Champion": "Support",
  "Data Wizard": "Innovation",
  "Problem Solver": "Achievement",
  "Going Above & Beyond": "Achievement",
};

const badges = [
  { title: "Team Player", desc: "Exceptional collaboration", icon: "🤝" },
  { title: "Innovation Star", desc: "Creative problem solving", icon: "⭐" },
  { title: "Customer Champion", desc: "Outstanding service", icon: "💪" },
  { title: "Data Wizard", desc: "Insights & analytics", icon: "📊" },
  { title: "Problem Solver", desc: "Quick thinking", icon: "🧩" },
  { title: "Going Above & Beyond", desc: "Extra mile effort", icon: "🚀" },
];

const POINTS_OPTIONS = [
  { value: 5, label: "5 points - Good Job" },
  { value: 10, label: "10 points - Great Work" },
  { value: 15, label: "15 points - Awesome" },
  { value: 25, label: "25 points - Outstanding" },
  { value: 50, label: "50 points - Exceptional" },
];

const CreateShoutoutModal = ({ isOpen, onClose, onSuccess }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [message, setMessage] = useState("");
  const [points, setPoints] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Trigger animation after a tick
      setTimeout(() => setIsAnimating(true), 0);
    } else {
      document.body.style.overflow = "unset";
      setIsAnimating(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Fetch all users on mount
  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  // Filter users based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allUsers.filter(
        (user) =>
          !selectedUsers.find((s) => s.id === user.id) && // Exclude already selected
          (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [searchQuery, allUsers, selectedUsers]);

  const fetchUsers = async () => {
    try {
      setError(null);
      const users = await getAllUsers();
      // Filter out current user if possible
      setAllUsers(users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users");
    }
  };

  const handleAddUser = (user) => {
    if (selectedUsers.length < 10) {
      setSelectedUsers([...selectedUsers, user]);
      setSearchQuery("");
      setShowUserDropdown(false);
    }
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== userId));
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (!selectedBadge) {
      setError("Please select a recognition badge");
      return;
    }

    if (selectedUsers.length === 0) {
      setError("Please select at least one person to recognize");
      return;
    }

    if (!message.trim()) {
      setError("Please write a message");
      return;
    }

    if (message.trim().length < 10) {
      setError("Message must be at least 10 characters");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const payload = {
        message: message.trim(),
        category: BADGE_CATEGORY_MAP[selectedBadge],
        recipient_ids: selectedUsers.map((u) => u.id),
        points: points,
      };

      const response = await createShoutout(payload);

      setSuccess(true);
      // Reset form
      setTimeout(() => {
        setSelectedBadge(null);
        setMessage("");
        setPoints(10);
        setSelectedUsers([]);
        setSearchQuery("");
        setSuccess(false);
        if (onSuccess) {
          onSuccess(response);
        }
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Error creating shoutout:", err);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Failed to create shoutout. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-black z-[99] transition-opacity duration-300 ${
          isAnimating ? "opacity-50" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* MODAL */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-[100] p-4 transition-all duration-300 pointer-events-none ${
          isAnimating ? "opacity-100 pointer-events-auto" : "opacity-0"
        }`}
        role="dialog"
        aria-labelledby="create-shoutout-title"
        aria-modal="true"
      >
        <div
          ref={modalRef}
          className="bg-white w-full max-w-[650px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl transition-transform duration-300"
          style={{ transform: isAnimating ? "scale(1)" : "scale(0.95)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="sticky top-0 flex justify-between items-center px-6 py-4 border-b bg-white rounded-t-2xl z-10">
            <div>
              <h2 id="create-shoutout-title" className="text-xl font-semibold">Create a Shout-Out</h2>
              <p className="text-sm text-slate-500">
                Recognize your teammates for their great work
              </p>
            </div>

            <button
              onClick={onClose}
              disabled={loading}
              className="flex-shrink-0 hover:bg-slate-100 p-1 rounded transition disabled:opacity-50"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 space-y-6">
            {/* ERROR/SUCCESS MESSAGES */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="text-red-600 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-medium text-red-900">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle className="text-green-600 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-medium text-green-900">
                    Shout-out created successfully! 🎉
                  </p>
                </div>
              </div>
            )}

            {/* BADGES */}
            <div>
              <label className="text-sm font-medium">
                Choose a recognition badge
              </label>

              <div className="grid grid-cols-2 gap-4 mt-3">
                {badges.map((b, i) => (
                  <div
                    key={i}
                    onClick={() => !loading && setSelectedBadge(b.title)}
                    className={`
                      p-4 rounded-xl border cursor-pointer transition
                      ${loading ? "opacity-50 cursor-not-allowed" : ""}
                      ${
                        selectedBadge === b.title
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-slate-200 hover:bg-slate-50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{b.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{b.title}</p>
                        <p className="text-xs text-slate-500">{b.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEARCH & SELECT USERS */}
            <div>
              <label className="text-sm font-medium">
                Who deserves recognition? 
                <span className="text-slate-500 font-normal">
                  ({selectedUsers.length}/10)
                </span>
              </label>

              {/* SEARCH INPUT */}
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search teammates by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowUserDropdown(true)}
                  disabled={loading || selectedUsers.length >= 10}
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100"
                />

                {/* DROPDOWN */}
                {showUserDropdown && searchQuery && filteredUsers.length > 0 && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => handleAddUser(user)}
                        type="button"
                        className="w-full text-left px-4 py-3 hover:bg-slate-100 border-b last:border-b-0 transition"
                      >
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </button>
                    ))}
                  </div>
                )}

                {showUserDropdown &&
                  searchQuery &&
                  filteredUsers.length === 0 &&
                  allUsers.length > 0 && (
                    <div className="absolute top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-4">
                      <p className="text-sm text-slate-500">No users found</p>
                    </div>
                  )}
              </div>

              {/* SELECTED USERS */}
              {selectedUsers.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                    >
                      <span>{user.name}</span>
                      <button
                        onClick={() => handleRemoveUser(user.id)}
                        type="button"
                        className="hover:bg-indigo-200 rounded-full p-0.5"
                        disabled={loading}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* POINTS SELECTION */}
            <div>
              <label className="text-sm font-medium">Points to Award</label>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {POINTS_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => !loading && setPoints(option.value)}
                    type="button"
                    disabled={loading}
                    className={`
                      px-4 py-2 rounded-xl border transition text-sm
                      ${
                        points === option.value
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-slate-200 hover:bg-slate-50"
                      }
                      ${loading ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-sm font-medium">Your message</label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                rows={4}
                placeholder="Write your appreciation...  (minimum 10 characters)"
                className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100"
              />
              <p className="text-xs text-slate-500 mt-1">
                {message.length}/1000 characters
              </p>
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 rounded-xl border hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading || selectedUsers.length === 0}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? "Sending..." : "Send Shout-Out"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default CreateShoutoutModal;
