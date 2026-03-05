const Profile = () => {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold text-darkText mb-6">
        My Profile
      </h2>

      <div className="space-y-4 text-darkText">
        <p><strong>Name:</strong> Employee Name</p>
        <p><strong>Role:</strong> Software Engineer</p>
        <p><strong>Email:</strong> employee@bragboard.com</p>
      </div>
    </div>
  );
};

export default Profile;