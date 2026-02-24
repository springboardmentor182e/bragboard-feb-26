import { Eye, Pencil, Trash2, Pin, PinOff } from "lucide-react";
import StatusBadge from "./StatusBadge";

const departmentStyles = {
  Engineering: "bg-blue-100 text-blue-700",
  Design: "bg-purple-100 text-purple-700",
  Marketing: "bg-amber-100 text-amber-700",
  Sales: "bg-green-100 text-green-700",
  HR: "bg-pink-100 text-pink-700",
};

const TableRow = ({ item, isSelected, onSelect, onTogglePin }) => {
  return (
    <tr
      className={`border-t transition hover:bg-gray-50 ${
        isSelected ? "bg-blue-50" : ""
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

      <td className="p-4">{item.author}</td>

      <td className="p-4">{item.recipient}</td>

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
        <div className="flex flex-col gap-1 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span>❤️</span>
            <span className="font-medium">{item.reactions?.hearts ?? 0}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>👏</span>
            <span className="font-medium">{item.reactions?.claps ?? 0}</span>
          </div>

          <div className="flex items-center gap-2">
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
            className={`p-1.5 rounded-lg transition ${
              item.status === "Pinned"
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {item.status === "Pinned" ? (
              <Pin className="w-4 h-4" />
            ) : (
              <PinOff className="w-4 h-4" />
            )}
          </button>

          {/* View */}
          <button className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
            <Eye className="w-4 h-4" />
          </button>

          {/* Edit */}
          <button className="p-1.5 rounded-lg bg-yellow-100 text-yellow-600">
            <Pencil className="w-4 h-4" />
          </button>

          {/* Delete */}
          <button className="p-1.5 rounded-lg bg-red-100 text-red-600">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
