import { useState } from "react";
import { shoutouts as mockData } from "../constants/mockData";
import TableRow from "./TableRow";

const ShoutoutTable = () => {
  const [data, setData] = useState(mockData);

  const togglePin = (id) => {
    const updated = data.map((item) =>
      item.id === id
        ? {
            ...item,
            status: item.status === "Pinned" ? "Active" : "Pinned",
          }
        : item
    );

    setData(updated);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 text-sm">
          <tr>
            <th className="p-4">Author</th>
            <th className="p-4">Recipient</th>
            <th className="p-4">Message</th>
            <th className="p-4">Department</th>
            <th className="p-4">Reactions</th>
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              item={item}
              onTogglePin={togglePin}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShoutoutTable;