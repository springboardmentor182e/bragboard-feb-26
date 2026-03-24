import { motion } from "framer-motion";

export default function ReportList({ reports, onSelect }) {
  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">

      <table className="w-full text-sm">
        <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-xs uppercase">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Title</th>
            <th className="p-4">User</th>
            <th className="p-4">Priority</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((r, i) => (
            <motion.tr
              key={r.id}
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <td className="p-4 text-gray-400">
                RPT-{String(i + 1).padStart(3, "0")}
              </td>

              <td className="p-4 font-medium dark:text-white">
                {r.title}
              </td>

              <td className="p-4 dark:text-gray-300">
                {r.reported_user}
              </td>

              <td className="p-4">
                <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                  {r.priority}
                </span>
              </td>

              <td className="p-4">
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                  {r.status}
                </span>
              </td>

              <td className="p-4">
                <button
                  onClick={() => onSelect(r)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-lg text-xs shadow hover:scale-105 transition"
                >
                  Review
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}