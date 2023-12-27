"use client";
import HouseholdDashboard from "@/components/household/dashboard";

export default function Home({ params }: { params: { household: string } }) {
  return <HouseholdDashboard householdId={params.household} />;
}
