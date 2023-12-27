"use client";

import { HouseholdsProvider } from "@/contexts/households";
import { ParticipantsProvider } from "@/contexts/participants";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ParticipantsProvider>{children}</ParticipantsProvider>;
}