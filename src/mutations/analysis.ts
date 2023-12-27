import connectDB from "@/lib/connect-db";
import { AnalysisModel } from "@/models/models";
import { Analysis as IAnalysis } from "@/types/types";

export async function createAnalysis(analysis: IAnalysis) {
    try {
        await connectDB();
        const analysisInstance = new AnalysisModel(analysis);
        await analysisInstance.save();
    } catch (error) {
        return { error };
    }
}