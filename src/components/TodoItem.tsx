import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_DOT: Record<string, string> = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-rose-400',
};

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function handleSave() {
    onEdit(todo.id, draft);
    setEditing(false);
  }

  function handleCancel() {
    setDraft(todo.text);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <li className="group flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors">
      {/* Priority dot */}
      <span
        className={clsx(
          'w-2 h-2 rounded-full flex-shrink-0',
          PRIORITY_DOT[todo.priority]
        )}
      />

      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all',
          todo.completed
            ? 'bg-green-600 border-green-600'
            : 'border-slate-600 hover:border-green-500'
        )}
      >
        {todo.completed && <Check size={11} className="text-white" strokeWidth={3} />}
      </button>

      {/* Text / Edit input */}
      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDraft(e.target.value)
          }
          onKeyDown={handleKeyDown}
          className="flex-1 bg-white/5 rounded-lg px-2 py-0.5 text-sm text-white outline-none border border-green-600/50 focus:border-green-500"
        />
      ) : (
        <span
          className={clsx(
            'flex-1 text-sm leading-relaxed break-all',
            todo.completed ? 'line-through text-slate-500' : 'text-slate-200'
          )}
        >
          {todo.text}
        </span>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg hover:bg-green-500/20 text-green-400 transition-colors"
            >
              <Check size={14} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg hover:bg-slate-500/20 text-slate-400 transition-colors"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            {!todo.completed && (
              <button
                onClick={() => {
                  setDraft(todo.text);
                  setEditing(true);
                }}
                className="p-1.5 rounded-lg hover:bg-green-500/20 text-slate-500 hover:text-green-400 transition-colors"
              >
                <Pencil size={14} />
              </button>
            )}
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
