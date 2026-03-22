function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 
      shadow-sm hover:shadow-md transition-all duration-300 
      p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;