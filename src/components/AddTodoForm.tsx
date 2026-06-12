import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITIES: { label: string; value: Priority; color: string }[] = [
  { label: 'Low', value: 'low', color: 'text-emerald-400' },
  { label: 'Med', value: 'medium', color: 'text-amber-400' },
  { label: 'High', value: 'high', color: 'text-rose-400' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 px-4 py-4 border-b border-white/5"
    >
      {/* Priority selector */}
      <div className="flex gap-1">
        {PRIORITIES.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={clsx(
              'text-xs font-semibold px-2 py-1 rounded-lg border transition-all',
              priority === p.value
                ? 'border-white/20 bg-white/10 ' + p.color
                : 'border-transparent text-slate-500 hover:text-slate-300'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Text input */}
      <input
        type="text"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        placeholder="Add a new task..."
        className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm outline-none"
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={!text.trim()}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Plus size={16} className="text-white" />
      </button>
    </form>
  );
}
