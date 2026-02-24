const ShoutoutHeader = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200">
         <span className="text-2xl">🎉</span>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Shoutout Management
        </h1>
        <p className="text-gray-500 font-medium">
          Manage, moderate, and organize all employee recognitions
        </p>
      </div>
    </div>
  );
};

export default ShoutoutHeader;