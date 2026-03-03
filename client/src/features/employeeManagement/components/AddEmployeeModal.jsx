import { useState } from "react";

function AddEmployeeModal({ setShowModal, employees, setEmployees }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "Employee",
    status: "Active",
  });

  const handleSubmit = () => {
    const newEmployee = {
      id: employees.length + 1,
      ...form,
      joinDate: new Date().toLocaleDateString(),
    };

    setEmployees([...employees, newEmployee]);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg space-y-4">

        <h2 className="text-xl font-semibold">Add Employee</h2>

        <input
          placeholder="Name"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Department"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEmployeeModal;