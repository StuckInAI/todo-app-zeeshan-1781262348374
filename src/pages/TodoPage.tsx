import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
    totalCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-[#13131f] flex flex-col items-center px-4 py-12">
      {/* Header */}
      <div className="w-full max-w-xl mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-1">
          ✅ My Todos
        </h1>
        <p className="text-slate-400 text-sm">Stay organised, stay productive.</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-xl bg-[#1e1e2e] rounded-2xl shadow-2xl overflow-hidden">
        <AddTodoForm onAdd={addTodo} />

        <StatsBar
          totalCount={totalCount}
          activeCount={activeCount}
          completedCount={completedCount}
        />

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
          completedCount={completedCount}
        />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>

      <p className="mt-6 text-xs text-slate-600">
        Data saved automatically in your browser.
      </p>
    </div>
  );
}
