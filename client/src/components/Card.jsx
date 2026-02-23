const Card = ({ children }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
      {children}
    </div>
  );
};

export default Card;