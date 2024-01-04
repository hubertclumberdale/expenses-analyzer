"use server"

import { createHousehold, editHousehold, getAllHouseholds, getHousehold, removeAllHouseholds } from "@/mutations/household";
import { Household } from "@/types/types";

export async function createHouseholdAction(household: Household) {
    await createHousehold(household)

}

export async function editHouseholdAction(household: Household) {
    await editHousehold(household)
}

export async function getAllHouseholdsAction() {
    const households = await getAllHouseholds()
    console.log("All households", households.map(household => household.expenses))
    return JSON.parse(JSON.stringify(households))
}

export async function getHouseholdAction(id: string) {
    const household = await getHousehold(id)
    return JSON.parse(JSON.stringify(household))
}
export async function removeAllHouseholdsAction() {
    await removeAllHouseholds()
}