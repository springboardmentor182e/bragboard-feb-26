export default function BadgePill({ badge }) {
  return (
    <div className="flex items-center gap-1.5 bg-primary-light px-3 py-1.5 rounded-lg shrink-0">
      <span className="text-base leading-none">{badge.emoji}</span>
      <span className="text-sm font-medium text-primary-dark whitespace-nowrap">{badge.label}</span>
    </div>
  );
}
