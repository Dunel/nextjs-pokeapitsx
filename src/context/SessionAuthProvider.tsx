"use client";
import { SessionProvider } from "next-auth/react";

const SessionAuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default SessionAuthProvider;