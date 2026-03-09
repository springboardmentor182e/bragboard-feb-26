function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-3xl border border-slate-200 
      shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;