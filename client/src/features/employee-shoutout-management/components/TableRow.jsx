import { Eye, Pencil, Trash2, Pin, PinOff } from "lucide-react";
import StatusBadge from "./StatusBadge";

const TableRow = ({ item, onTogglePin }) => {
  return (
    <tr className="border-t hover:bg-gray-50 transition">

      {/* Author */}
      <td className="p-4">{item.author}</td>

      {/* Recipient */}
      <td className="p-4">{item.recipient}</td>

      {/* Message */}
      <td className="p-4 max-w-xs truncate">
        {item.message}
      </td>

      {/* Department */}
      <td className="p-4">{item.department}</td>

      {/* Reactions */}
      <td className="p-4">
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-2">
            <span>❤️</span>
            <span>{item.reactions?.hearts}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>👏</span>
            <span>{item.reactions?.claps}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>💬</span>
            <span>{item.reactions?.comments}</span>
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