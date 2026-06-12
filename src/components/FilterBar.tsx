import clsx from 'clsx';
import { FilterType } from '@/types';

type FilterBarProps = {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  onClearCompleted: () => void;
  completedCount: number;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function FilterBar({
  filter,
  onFilterChange,
  onClearCompleted,
  completedCount,
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
      <div className="flex gap-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={clsx(
              'text-xs font-medium px-3 py-1.5 rounded-lg transition-all',
              filter === f.value
                ? 'bg-indigo-500/20 text-indigo-300'
                : 'text-slate-400 hover:text-white'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs text-slate-500 hover:text-rose-400 transition-colors"
        >
          Clear {completedCount} done
        </button>
      )}
    </div>
  );
}
