const Avatar = ({ name }) => {
  const initial = name ? name[0].toUpperCase() : '?';
  const colors = [
    'bg-purple-200', 'bg-pink-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-indigo-200'
  ];
  const color = colors[name ? name.length % colors.length : 0];

  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color} text-purple-700 font-bold`}>
      {initial}
    </div>
  );
};

export default Avatar;
