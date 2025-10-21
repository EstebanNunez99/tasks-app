//este es un componente de servidor
import { TasksManager } from "@/components/TaskManager";
import { Task } from "@/components/TaskManager";
// //esta es la estructura que tiene nuestro datos de tarea
// //son como los registros de AED
//ya no hace falta porque la importamos desde el manager
// interface Task {
//   id: number;
//   title: string;
//   description: string | null;
//   completed: boolean;
// }


//esta es la fucion que pide los datos a NestJS por eso le indicamosel puerto en 3001
async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${process.env.API_URL}/tasks`, { cache: 'no-store' });
  if (!res.ok) { throw new Error('Failed to fetch tasks'); }
  return res.json();
}

export default async function HomePage() {
  const tasks = await fetchTasks();

  return (
    <main className="container mx-auto mt-10 p-4">
      <h1 className="text-4xl font-bold mb-6 text-white">App de Tareas</h1>
      <TasksManager initialTasks={tasks} />
    </main>
  );
}