// src/components/TasksManager.tsx

"use client";

import { useState } from "react";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { FindTaskForm } from "./FindTaskForm";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
}

export function TasksManager({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);

  // --- LÓGICA DE ESTADO ---
  const handleTaskCreated = (newTask: Task) => {
    setTasks([newTask, ...tasks]);
  };

  const handleDelete = (idToDelete: number) => {
    setTasks(tasks.filter(task => task.id !== idToDelete));
  };
  const handleToggleComplete = (idToToggle: number, newCompletedState: boolean) => {
    setTasks(tasks.map(task => 
      task.id === idToToggle ? { ...task, completed: newCompletedState } : task
    ));
  };
  
  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  // --- RENDERIZADO ---
  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Agregá una tarea</h2>
      <TaskForm onTaskCreated={handleTaskCreated} />
      
      <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Buscá una tarea por su ID</h2>
      <FindTaskForm />

      <TaskList 
        title="Tareas Pendientes 📝" 
        tasks={pendingTasks} 
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
        onTaskUpdated={handleTaskUpdated}
      />
      <TaskList 
        title="Tareas Completadas ✅" 
        tasks={completedTasks}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
        onTaskUpdated={handleTaskUpdated}
      />
    </div>
  );
}