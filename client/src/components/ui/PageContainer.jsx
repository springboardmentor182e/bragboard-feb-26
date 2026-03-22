function PageContainer({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {children}
      </div>
    </div>
  );
}

export default PageContainer;