"use server"

import { createHousehold, getAllHouseholds } from "@/mutations/household";
import { Household } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createHouseholdAction(household: Household) {
    await createHousehold(household)
    revalidatePath('/dashboard');

}

export async function getAllHouseholdsAction() {
    const households = await getAllHouseholds()
    return households
}