// "use client"

// import { useState } from "react"

// interface Task {
//     id: number;
//     title: string;
//     description: string | null;
//     completed: boolean;
// }
// interface UpdateTaskFormProps {
//     task: Task;
//     onClose: () => void;
// }
// //el objeto { acá van las props } que en este caso solo tiene una prop, que es onClose
// //es un objeto en el que tenemos que pasar todas las props que espera recibir la funcion 

// // la parte de : {onClose: ()=>void} es un contrato de TS, que obliga a que el 
// //objeto, el que le pasan como prop, que está antes de la funcion anonima ()=>, en este caso es 
// //onClose: tenga obligatoriamente una propiedad llamada onClose, 
// //esto se debe cumplir cada vez que hago una llamada a esta funcion
// export function UpdateTaskForm({ task, onClose }: UpdateTaskFormProps) {

//     const [title, setTitle] = useState(task.title)
//     const [description, setDescription] = useState(task.description || '')

//     const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`, {
//             method: 'PATCH',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ title, description })
//         })
//         window.location.reload()
//     }

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
//             <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
//                 <form onSubmit={handleUpdate}>
//                     <h2 className="text-2xl font-bold mb-6 text-white">Editar Tarea</h2>
//                     <div className="flex flex-col gap-4 mb-6">
//                         <input
//                             type="text"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             className="bg-gray-700 text-white p-2 rounded-md border border-gray-600"
//                         />
//                         <textarea
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             className="bg-gray-700 text-white p-2 rounded-md border border-gray-600"
//                             rows={4}
//                         />
//                     </div>
//                     <div className="flex justify-end gap-4">
//                         <button
//                             type="button" // Importante que no sea 'submit'
//                             onClick={onClose}
//                             className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
//                         >
//                             Cancelar
//                         </button>
//                         <button
//                             type="submit"
//                             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
//                         >
//                             Guardar Cambios
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }
// src/components/UpdateTaskForm.tsx

"use client";

import { useState } from "react";
import { Task } from "./TaskManager";

interface UpdateTaskFormProps {
    task: Task;
    onClose: () => void;
    onTaskUpdated: (task: Task) => void; // Ahora espera recibir la función
}

export function UpdateTaskForm({ task, onClose, onTaskUpdated }: UpdateTaskFormProps) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || '');

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:3001/tasks/${task.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description }),
        });

        const updatedTask = await res.json();

        // En lugar de recargar, avisamos al padre que la tarea se actualizó
        onTaskUpdated(updatedTask);

        // Y cerramos el modal
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
                <form onSubmit={handleUpdate}>
                    <h2 className="text-2xl font-bold mb-6 text-white">Editar Tarea</h2>
                    <div className="flex flex-col gap-4 mb-6">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md border border-gray-600"
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md border border-gray-600"
                            rows={4}
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button" // Importante que no sea 'submit'
                            onClick={onClose}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}