import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extiende el tipo Session para añadir nuestra propiedad accessToken.
   */
  interface Session {
    accessToken?: string; // Hacemos que accessToken sea una propiedad opcional en Session
    user?: DefaultSession["user"]; // Mantenemos las propiedades originales del usuario
  }
}