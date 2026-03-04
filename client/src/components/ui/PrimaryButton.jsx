function PrimaryButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-indigo-600 text-white rounded-2xl px-5 py-2 shadow-md hover:shadow-indigo-300 hover:scale-105 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;