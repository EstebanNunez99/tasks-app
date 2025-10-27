// // src/components/AuthButtons.tsx
// "use client"; // Marcamos como Componente de Cliente para interactividad y hooks

// import { useSession, signIn, signOut } from "next-auth/react";

// export function AuthButtons() {
//   // Obtenemos el estado de la sesión y el estado de carga
//   const { data: session, status } = useSession(); 

//   // Si está cargando la información de la sesión, mostramos un mensaje
//   if (status === "loading") {
//     return <p className="text-gray-400">Cargando...</p>; 
//   }

//   // Si 'session' tiene datos, significa que el usuario está logueado
//   if (session) {
//     return (
//       <div className="flex items-center gap-4 mb-4">
//         {/* Mostramos un saludo (usamos el nombre del usuario si está disponible) */}
//         <p className="text-white">¡Hola, {session.user?.name ?? 'Usuario'}!</p>
//         {/* Botón para cerrar sesión */}
//         <button 
//           onClick={() => signOut()} // Llama a la función signOut de Auth.js
//           className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
//         >
//           Cerrar Sesión
//         </button>
//       </div>
//     );
//   }

//   // Si no hay sesión, mostramos el botón para iniciar sesión
//   return (
//     <div className="mb-4">
//       <button 
//         onClick={() => signIn("keycloak")} // Llama a signIn especificando el proveedor 'keycloak'
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
//       >
//         Iniciar Sesión con Keycloak
//       </button>
//     </div>
//   );
// }
