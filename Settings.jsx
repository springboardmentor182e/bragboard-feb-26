function Settings() {
  return (
    <div>

      <h2 className="text-2xl font-bold mb-4">
        Settings
      </h2>

      <div className="bg-white p-6 rounded shadow">

        <p className="mb-4">Admin Profile Settings</p>

        <input
          placeholder="Admin Name"
          className="border p-2 rounded w-full mb-3"
        />

        <input
          placeholder="Email"
          className="border p-2 rounded w-full mb-3"
        />

        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default Settings;