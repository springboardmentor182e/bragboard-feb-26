const DEPT_STYLES = {
  Engineering: 'bg-indigo-50 text-indigo-600',
  Marketing:   'bg-amber-50 text-amber-700',
  Sales:       'bg-emerald-50 text-emerald-700',
  Design:      'bg-purple-50 text-purple-700',
  HR:          'bg-rose-50 text-rose-600',
};

export default function DepartmentPill({ department }) {
  const styles = DEPT_STYLES[department] ?? 'bg-gray-100 text-gray-700';
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${styles}`}>
      {department}
    </span>
  );
}
