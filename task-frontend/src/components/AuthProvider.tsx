"use client"; // 1. Marca este componente como Cliente

import { SessionProvider } from "next-auth/react";
import React from "react";

// 2. Este componente recibe 'children' y los envuelve con SessionProvider
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
