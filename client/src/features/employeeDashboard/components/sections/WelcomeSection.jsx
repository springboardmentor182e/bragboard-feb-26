const WelcomeSection = () => {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-2xl p-6
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        text-white
        shadow-[0_20px_60px_rgba(99,102,241,0.35)]
        flex items-center justify-between
      "
    >

      {/* Glow effect */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>

      {/* LEFT */}
      <div className="flex items-center gap-4 z-10">

        {/* AVATAR */}
        <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur text-white flex items-center justify-center text-lg font-bold shadow">
          A
        </div>

        <div>
          <h1 className="text-2xl font-semibold">
            Welcome back, Alex 👋
          </h1>

          <p className="text-sm text-white/80 mt-1">
            Here’s your recognition overview and team highlights
          </p>

          {/* LEVEL BADGE */}
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur">
            ⭐ Level 7 - Team Champion
          </div>
        </div>

      </div>

      {/* RIGHT */}
      <div className="hidden md:block text-right z-10">
        <p className="text-xs text-white/70">Today</p>
        <p className="text-sm font-medium">
          Keep recognizing 🚀
        </p>
      </div>

    </div>
  );
};

export default WelcomeSection;