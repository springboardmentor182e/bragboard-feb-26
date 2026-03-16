import { useState, useEffect } from "react";
import { getEmployees } from "../services/employeeService";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

const ShoutoutForm = ({ selectedEmployee, onShoutoutCreated }) => {
  const [recipientId, setRecipientId] = useState("");
  const [message, setMessage] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getEmployees();
        setEmployees(res.data);
      } catch (err) {
        console.error("Failed to load employees", err);
      }
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedEmployee) {
      setError("Please select your employee profile first.");
      return;
    }
    if (!recipientId || !message.trim()) {
      setError("Please select a recipient and write a message.");
      return;
    }
    if (Number(recipientId) === selectedEmployee.id) {
      setError("You can't send a shoutout to yourself!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/shoutouts/`, {
        sender_id: selectedEmployee.id,
        recipient_id: Number(recipientId),
        message: message.trim(),
      });

      onShoutoutCreated?.(res.data); // notify parent with saved shoutout
      setRecipientId("");
      setMessage("");
    } catch (err) {
      console.error("Failed to post shoutout", err);
      setError("Failed to post shoutout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter out the sender from the recipient dropdown
  const recipientOptions = employees.filter(
    (emp) => emp.id !== selectedEmployee?.id
  );

  return (
    <div className="bg-white dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-xl mb-8 border border-gray-200 dark:border-gray-700">

      <h2 className="text-xl font-semibold mb-1 text-gray-800 dark:text-white">
        Send a Shoutout 🎉
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {selectedEmployee
          ? `Sending as: ${selectedEmployee.name}`
          : "Select your profile to send a shoutout"}
      </p>

      {/* Inline Error */}
      {error && (
        <div className="mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Recipient Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Recipient
          </label>
          <select
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select Employee</option>
            {recipientOptions.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} — {emp.department}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Message
          </label>
          <textarea
            placeholder="Write your appreciation message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !selectedEmployee}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Posting..." : "Post Shoutout 🚀"}
        </button>

      </form>
    </div>
  );
};

export default ShoutoutForm;