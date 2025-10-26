"use client";

import React, { useState } from "react";
import { Task } from "./TaskManager"; // Asegúrate que la ruta sea correcta si moviste TaskManager

export function FindTaskForm() {
  const [id, setId] = useState('');
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTask(null);
    setError(null);

    // --- VALIDACIÓN DEL ID ---
    // 1. Verifica si el campo está vacío
    if (!id.trim()) {
      setError("Por favor, ingresa un ID para buscar.");
      return; // Detiene la función
    }
    // 2. Convierte a número y verifica si es válido (mayor o igual a 0)
    const numericId = parseInt(id, 10);
    if (isNaN(numericId) || numericId < 0) {
      setError("Por favor, ingresa un ID numérico válido (mayor o igual a 0).");
      return; // Detiene la función
    }
    // -------------------------

    // Ahora usamos numericId para el fetch
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${numericId}`);

    if (!res.ok) {
      setError('Tarea no encontrada.');
      return;
    }

    const foundTask = await res.json();
    setTask(foundTask);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Buscar Tarea por ID</h2>
      <form onSubmit={handleSearch} className="flex items-center gap-4">
        <input
          type="number"
          // 3. Añadimos min="0" para ayudar al navegador a prevenir negativos
          min="0"
          placeholder="Ingresa el ID de la tarea"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            if (error) setError(null); // Limpia error al escribir
          }}
          className={`flex-grow bg-gray-700 text-white p-2 rounded-md border ${error ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Buscar
        </button>
      </form>

      {/* Mostramos la tarea si se encontró */}
      {task && (
        <div className="mt-6 bg-gray-900 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-white">Titulo: {task.title}</h3>
          <p className="text-gray-400">Descripcion: {task.description}</p>
          <p className="text-gray-400">Estado:</p>

          <span className={task.completed ? 'text-green-400' : 'text-yellow-400'}>
            {task.completed ? 'Completada' : 'Pendiente'}
          </span>
        </div>
      )}

      {/* Mostramos el error si ocurrió */}
      {error && (
        <div className="mt-6 bg-red-900 p-4 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
