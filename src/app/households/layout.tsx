"use client";

import { HouseholdsProvider } from "@/contexts/households";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HouseholdsProvider>{children}</HouseholdsProvider>;
}
