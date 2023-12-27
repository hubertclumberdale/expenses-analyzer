"use server"
import { createAnalysis } from "@/mutations/analysis"
import { Analysis } from "@/types/types"

export async function createAnalysisAction({ analysis }: { analysis: Analysis }) {
    await createAnalysis(analysis)
}
