const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-white dark:bg-slate-900
        rounded-2xl
        border border-slate-200 dark:border-slate-800
        shadow-[0_2px_10px_rgba(0,0,0,0.04)]
        p-6
        transition-all duration-200
        hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;