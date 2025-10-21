// "use client"

// import { useState } from "react"
// import { UpdateTaskForm } from "./UpdateTaskForm"

// interface Task{
//  id: number;
//   title: string;
//   description: string | null;
//   completed: boolean;
// }


// export function EditTaskButton({ task }: { task:Task }) {
//     //iniciamos en falso para que no se muestre al cargar la pagina
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     return (
//         <>
//             {/* El botón que el usuario ve */}
//             <button
//                 onClick={() => setIsModalOpen(true)} // Al hacer clic, abre el modal
//                 className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-md"
//             >
//                 Editar
//             </button>
            

//             {/* Renderizado condicional: Si isModalOpen es true, muestra el formulario */}
//             {isModalOpen && 
//                 <UpdateTaskForm 
//                 task={task}
//                 onClose={() => setIsModalOpen(false)} 
//                 />}
//         </>
//     )
// }

// src/components/EditTaskButton.tsx

"use client"

import { useState } from "react"
import { UpdateTaskForm } from "./UpdateTaskForm"
import { Task } from "./TaskManager";

interface EditButtonProps {
  task: Task;
  onTaskUpdated: (task: Task) => void; // Ahora espera recibir la función de actualización
}

export function EditTaskButton({ task, onTaskUpdated }: EditButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded-md"
            >
                Editar
            </button>
            
            {isModalOpen && 
                <UpdateTaskForm 
                  task={task}
                  onClose={() => setIsModalOpen(false)} 
                  onTaskUpdated={onTaskUpdated} // Se la pasamos al formulario
                />}
        </>
    )
}