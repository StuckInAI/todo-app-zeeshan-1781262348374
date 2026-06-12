import { Todo } from '@/types';
import TodoItem from '@/components/TodoItem';
import { ClipboardList } from 'lucide-react';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-600">
        <ClipboardList size={40} className="mb-3 opacity-40" />
        <p className="text-sm">Nothing here yet. Add a task above!</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-white/5">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
