const DataTable = ({ columns, data, renderActions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="py-3 px-2">
                {col}
              </th>
            ))}
            {renderActions && <th className="py-3 px-2">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b hover:bg-gray-50 transition"
            >
              {columns.map((col, colIndex) => {
  const key = Object.keys(row)[colIndex + 1]; 
  return (
    <td key={colIndex} className="py-4 px-2">
      {row[key]}
    </td>
  );
})}

              {renderActions && (
                <td className="py-4 px-2">
                  {renderActions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;