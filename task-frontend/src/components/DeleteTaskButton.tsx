"use client";

interface DeleteButtonProps {
    taskId: number;
    onDelete: (id: number) => void; // Recibe una función 'onDelete'
}


export function DeleteTaskButton({ taskId, onDelete }: DeleteButtonProps) {

    const handleClick = () => {
        if (confirm('¿Estás seguro de que querés eliminar esta tarea?')) {
            // Simplemente llama a la función que recibió de su padre
            onDelete(taskId);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md"
        >
            Eliminar
        </button>
    );
}