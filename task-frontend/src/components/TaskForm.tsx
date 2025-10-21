"use client"; // es un componente cliente

import { useState } from "react";
import { Task } from "./TaskManager";

export function TaskForm({ onTaskCreated }: { onTaskCreated: (task: Task) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null); // Estado para el error

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    const newTask = await res.json();
    
    onTaskCreated(newTask);
    setTitle('');
    setDescription('');
    setError(null); // Limpia el error si todo fue exitoso
  };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Crear Nueva Tarea</h2>
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Título de la tarea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    placeholder="Descripción de la tarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
                type="submit"
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
                Guardar Tarea
            </button>
        </form>
    );
}