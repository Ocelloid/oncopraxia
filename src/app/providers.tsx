"use client";

import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "~/trpc/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <SessionProvider>
        <HeroUIProvider>{children}</HeroUIProvider>
      </SessionProvider>
    </TRPCReactProvider>
  );
}
