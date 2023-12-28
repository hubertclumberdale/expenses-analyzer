"use server"

import { createHousehold, editHousehold, getAllHouseholds, removeAllHouseholds } from "@/mutations/household";
import { Household } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createHouseholdAction(household: Household) {
    await createHousehold(household)
    revalidatePath('/households');

}

export async function editHouseholdAction(household: Household) {
    await editHousehold(household)
    revalidatePath('/households');
}

export async function getAllHouseholdsAction() {
    const households = await getAllHouseholds()
    return households
}

export async function removeAllHouseholdsAction() {
    await removeAllHouseholds()
}