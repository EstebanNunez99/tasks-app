"use client"; // es un componente cliente

import { useState } from "react";
import { Task } from "./TaskManager"; // Asegúrate que la ruta sea correcta si moviste TaskManager

export function TaskForm({ onTaskCreated }: { onTaskCreated: (task: Task) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null); // Estado para el error

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Limpiamos errores anteriores

    // --- VALIDACIÓN DEL FRONTEND ---
    if (!title.trim()) {
      setError("El título es obligatorio.");
      return; // Detiene el envío si el título está vacío
    }
    // -----------------------------

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    // --- VERIFICACIÓN DE LA RESPUESTA DEL BACKEND ---
    if (!res.ok) {
      // Si el backend devolvió un error (ej: 400 por validación)
      try {
        const errorData = await res.json();
        // Mostramos el primer mensaje de error que manda NestJS
        setError(errorData.message[0] || "Ocurrió un error al crear la tarea.");
      } catch (jsonError) {
        // Si la respuesta ni siquiera es JSON
        setError("Error del servidor al crear la tarea.");
      }
      return; // Detenemos la ejecución aquí
    }
    // ---------------------------------------------

    // Si llegamos aquí, ¡todo fue exitoso!
    const newTask = await res.json();
    onTaskCreated(newTask); // Avisamos al padre
    setTitle(''); // Limpiamos los campos
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Crear Nueva Tarea</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(null); // Limpia el error al escribir
          }}
          // Aplica borde rojo si hay error
          className={`bg-gray-700 text-white p-2 rounded-md border ${error ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <textarea
          placeholder="Descripción de la tarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>
      {/* Muestra el mensaje de error */}
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
