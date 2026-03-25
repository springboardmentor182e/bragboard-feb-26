const WelcomeSection = () => {
  return (
    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-lg shadow">
        A
      </div>

      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Welcome back, Alex 👋
        </h1>

        <p className="text-slate-500 mt-1">
          Here's your recognition overview and team highlights
        </p>

        <div className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow">
          ⭐ Level 7 - Team Champion
        </div>
      </div>

    </div>
  );
};

export default WelcomeSection;