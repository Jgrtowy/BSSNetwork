"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import Header from "../components/Header";

interface Props {
  children?: React.ReactNode;
}

export default function NextAuthSessionProvider({ children }: Props) {
  return (
    <SessionProvider>
      <Header />
      {children}
    </SessionProvider>
  );
}
