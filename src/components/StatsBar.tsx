type StatsBarProps = {
  totalCount: number;
  activeCount: number;
  completedCount: number;
};

export default function StatsBar({
  totalCount,
  activeCount,
  completedCount,
}: StatsBarProps) {
  if (totalCount === 0) return null;

  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="px-4 py-3 border-b border-white/5">
      <div className="flex justify-between text-xs text-slate-400 mb-2">
        <span>{activeCount} remaining</span>
        <span>{pct}% done</span>
      </div>
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
