// import { DeleteTaskButton } from "@/components/DeleteTaskButton";
// import { EditTaskButton } from "@/components/EditTaskButton";
// import { CompletedTaskButton } from "@/components/CompletedTaskButton";
// import { TaskCard } from "./TaskCard";
// import { Task } from "./TaskManager";
// //props como array asi no definimos una por una en la funcion

// interface TaskListProps {
//   title: string;
//   tasks: Task[];//ya recibe las tareas filtradas por estado
//   onDelete: (id: number) => void;
// }

// export function TaskList({ title, tasks, onDelete }: TaskListProps) {
//   return (
//     <section className="mb-12">
//       <h2 className="text-3xl font-bold mb-6">{title}</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {tasks.map(task => (
//           <div key={task.id} className={`p-4 rounded-lg flex flex-col justify-between ${task.completed ? 'bg-gray-900 opacity-60' : 'bg-gray-800'}`}>
//             <TaskCard task={task} />
//             <div className="flex justify-end mt-4 gap-2">
//               <CompletedTaskButton task={task} />
//               {!task.completed && <EditTaskButton task={task} />}
//               {/* Ahora simplemente pasa la función que recibió de su padre */}
//               <DeleteTaskButton taskId={task.id} onDelete={onDelete} />
//             </div>
//           </div>
//         ))}
//         {tasks.length === 0 && <p className="text-gray-500 col-span-full">No hay tareas en esta sección.</p>}
//       </div>
//     </section>
//   );
// }
// src/components/TaskList.tsx

import { DeleteTaskButton } from "./DeleteTaskButton";
import { EditTaskButton } from "./EditTaskButton";
import { CompletedTaskButton } from "./CompletedTaskButton";
import { Task } from "./TaskManager";

interface TaskListProps {
  title: string;
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
  onTaskUpdated: (task: Task) => void;
}

export function TaskList({ title, tasks, onDelete, onToggleComplete, onTaskUpdated }: TaskListProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map(task => (
          <div key={task.id} className={`p-4 rounded-lg flex flex-col justify-between ${task.completed ? 'bg-gray-900 opacity-60' : 'bg-gray-800'}`}>
            <div>
              <h3 className={`text-xl font-semibold text-white ${task.completed && 'line-through'}`}>{task.title}</h3>
              <p className="text-gray-400 mt-2">{task.description}</p>
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <CompletedTaskButton task={task} onToggle={onToggleComplete} />
              {!task.completed && <EditTaskButton task={task} onTaskUpdated={onTaskUpdated} />}
              <DeleteTaskButton taskId={task.id} onDelete={onDelete} />
            </div>
          </div>
        ))}
        {tasks.length === 0 && <p className="text-gray-500 col-span-full">No hay tareas en esta sección.</p>}
      </div>
    </section>
  );
}