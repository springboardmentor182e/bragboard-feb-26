import { Eye, Pencil, Trash2, Pin, PinOff } from "lucide-react";
import StatusBadge from "./StatusBadge";

const departmentStyles = {
  Engineering: "bg-blue-100 text-blue-700",
  Design: "bg-purple-100 text-purple-700",
  Marketing: "bg-amber-100 text-amber-700",
  Sales: "bg-green-100 text-green-700",
  HR: "bg-pink-100 text-pink-700",
};

const TableRow = ({ item, isSelected, onSelect, onTogglePin, onView, onEdit, onDelete }) => {
  return (
    <tr
      className={`border-t transition hover:bg-gray-50 ${
        isSelected ? "bg-purple-50" : ""
      }`}
    >
      {/* Checkbox */}
      <td className="p-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(item.id)}
          className="w-4 h-4 cursor-pointer"
        />
      </td>

      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {item.author
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="text-sm font-semibold text-gray-900">
            {item.author}
          </div>
        </div>
      </td>

      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {item.recipient
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="text-sm font-semibold text-gray-900">
            {item.recipient}
          </div>
        </div>
      </td>

      <td className="p-4">
        {item.badge && (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
            {item.badge.label}
          </span>
        )}
      </td>

      <td className="p-4 max-w-xs truncate">{item.message}</td>

      <td className="p-4">
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
            departmentStyles[item.department] ?? "bg-gray-100 text-gray-700"
          }`}
        >
          {item.department}
        </span>
      </td>

      <td className="p-4">
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <span>❤️</span>
            <span className="font-medium">{item.reactions?.hearts ?? 0}</span>
          </div>

          <div className="flex items-center gap-1">
            <span>👏</span>
            <span className="font-medium">{item.reactions?.claps ?? 0}</span>
          </div>

          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span className="font-medium">{item.reactions?.stars ?? 0}</span>
          </div>

          <div className="flex items-center gap-1">
            <span>💬</span>
            <span className="font-medium">{item.reactions?.comments ?? 0}</span>
          </div>
        </div>
      </td>

      {/* Date */}
      <td className="p-4">{item.date}</td>

      {/* Status */}
      <td className="p-4">
        <StatusBadge status={item.status} />
      </td>

      {/* Actions */}
      <td className="p-4 align-middle">
        <div className="flex items-center justify-center gap-2">
          {/* Pin Toggle */}
          <button
            onClick={() => onTogglePin(item.id)}
            className={`p-1.5 rounded-full border transition-colors ${
              item.status === "Pinned"
                ? "bg-purple-50 border-purple-400 text-purple-700 hover:bg-purple-100"
                : "bg-white border-gray-200 text-gray-400 hover:border-purple-200 hover:text-purple-500 hover:bg-gray-50"
            }`}
          >
            {item.status === "Pinned" ? (
              <Pin className="w-4 h-4" />
            ) : (
              <PinOff className="w-4 h-4" />
            )}
          </button>

          {/* View */}
          <button
            onClick={() => onView(item)}
            className="p-1.5 rounded-full bg-white border border-purple-200 text-purple-600 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Edit */}
          <button
            onClick={() => onEdit(item)}
            className="p-1.5 rounded-full bg-white border border-amber-200 text-amber-600 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(item)}
            className="p-1.5 rounded-full bg-white border border-rose-200 text-rose-600 hover:border-rose-400 hover:text-rose-700 hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
