// src/components/CompletedTaskButton.tsx

"use client";
import { Task } from "./TaskManager";

interface ButtonProps {
  task: Task;
  onToggle: (id: number, completed: boolean) => void;
}

export function CompletedTaskButton({ task, onToggle }: ButtonProps) {
  const handleToggle = async () => {
    const newCompletedState = !task.completed;
    
    // Sigue haciendo el fetch, pero ya no recarga la página
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: newCompletedState }),
    });

    // En lugar de recargar, avisa al padre para que actualice el estado
    onToggle(task.id, newCompletedState);
  };

  return (
    <button onClick={handleToggle} /* ... (el resto del botón no cambia) ... */ >
      {task.completed ? 'Desmarcar' : 'Completar'}
    </button>
  );
}