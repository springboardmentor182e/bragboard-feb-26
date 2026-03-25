export default function BadgeCard({ badge }) {
  const { emoji, name, description, awarded } = badge;

  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm flex flex-col items-center text-center gap-3">
      <span className="text-6xl leading-none">{emoji}</span>
      <div>
        <h3 className="font-bold text-gray-900 text-base mt-1">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <span className="mt-1 inline-flex items-center px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium">
        Awarded {awarded} times
      </span>
    </div>
  );
}
