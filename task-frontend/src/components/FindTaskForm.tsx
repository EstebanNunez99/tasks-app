"use client"

import React, { useState } from "react"

//de nuevo definimos el registro Task, para que no te olvides de Giova
interface Task {
  id: number;
  title: string;
  description: string | null
  completed: boolean
}

export function FindTaskForm() {
  //estado para manejar la entrada input
  const [id, setId] = useState('')
  //estado para manejar la tara
  const [task, setTask] = useState<Task | null>(null)
  //estado para manejar errores
  const [error, setError] = useState<string | null>(null)


  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //limpio los resultados anteriores
    setTask(null)
    setError(null)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`)

    if (!res.ok) {
      setError('Task not found')
      return
    }

    const foundTask = await res.json()
    setTask(foundTask)
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Buscar Tarea por ID</h2>
      <form onSubmit={handleSearch} className="flex items-center gap-4">
        <input
          type="number"
          placeholder="Ingresa el ID de la tarea"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="flex-grow bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <h3 className="text-xl font-semibold text-white">{task.title}</h3>
          <p className="text-gray-400">{task.description}</p>
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


// //-------
// "use client";

// import { useState } from "react";

// // Definimos la forma de una Tarea para usarla en nuestro estado
// interface Task {
//   id: number;
//   title: string;
//   description: string | null;
//   completed: boolean;
// }

// export function FindTaskForm() {
//   // Estados para manejar el input, la tarea encontrada y los errores
//   const [id, setId] = useState('');
//   const [task, setTask] = useState<Task | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Limpiamos resultados anteriores antes de cada búsqueda
//     setTask(null);
//     setError(null);

//     const res = await fetch(`http://localhost:3001/tasks/${id}`);

//     if (!res.ok) {
//       // Si la API devuelve un error (ej: 404 Not Found), lo mostramos
//       setError('Tarea no encontrada.');
//       return;
//     }

//     const foundTask = await res.json();
//     setTask(foundTask);
//   };

//   return (
//     <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
//       <h2 className="text-2xl font-bold mb-4 text-white">Buscar Tarea por ID</h2>
//       <form onSubmit={handleSearch} className="flex items-center gap-4">
//         <input
//           type="number"
//           placeholder="Ingresa el ID de la tarea"
//           value={id}
//           onChange={(e) => setId(e.target.value)}
//           className="flex-grow bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
//         >
//           Buscar
//         </button>
//       </form>

//       {/* Mostramos la tarea si se encontró */}
//       {task && (
//         <div className="mt-6 bg-gray-900 p-4 rounded-lg">
//           <h3 className="text-xl font-semibold text-white">{task.title}</h3>
//           <p className="text-gray-400">{task.description}</p>
//           <span className={task.completed ? 'text-green-400' : 'text-yellow-400'}>
//             {task.completed ? 'Completada' : 'Pendiente'}
//           </span>
//         </div>
//       )}

//       {/* Mostramos el error si ocurrió */}
//       {error && (
//         <div className="mt-6 bg-red-900 p-4 rounded-lg">
//           <p className="text-red-400">{error}</p>
//         </div>
//       )}
//     </div>
//   );
// }