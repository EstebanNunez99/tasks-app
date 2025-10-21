//definimos la estructura que va a tener Task
interface Task {
    id: number;
    title: string;
    description: string | null;
    completed: boolean
}

export function TaskCard({ task }: { task: Task }) {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className={`text-xl font-semibold text-white ${task.completed && 'line-through'}`}>Tarea: {task.title}</h2>
            <p className="text-gray-400 mt-2">Descripcion: {task.description}</p>
        </div>
    )
}
