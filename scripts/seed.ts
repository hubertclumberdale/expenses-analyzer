import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { ObjectId } from 'mongodb';
import connectDB from '../src/lib/connect-db';
import { ParticipantModel, TransactionModel, HouseholdModel } from '../src/models/models';

function convertObjectIdFields(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(convertObjectIdFields);
    } else if (obj !== null && typeof obj === 'object') {
        const newObj: any = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key === '$oid') {
                    return new ObjectId(obj[key]);
                } else if (key === '$date') {
                    return new Date(obj[key]);
                } else if (key === '$numberLong') {
                    return Number(obj[key]);
                } else {
                    newObj[key] = convertObjectIdFields(obj[key]);
                }
            }
        }
        return newObj;
    }
    return obj;
}

async function seedData(filename: string): Promise<void> {
    try {
        await connectDB();

        const filePath = path.join(__dirname, '../backup', filename);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        const convertedData = convertObjectIdFields(data);

        if (filename.includes('participants')) {
            await ParticipantModel.insertMany(convertedData);
            console.log("seeding 'participants'");
        }

        if (filename.includes('transactions')) {
            await TransactionModel.insertMany(convertedData);
            console.log("seeding 'transactions'");
        }

        if (filename.includes('households')) {
            await HouseholdModel.insertMany(convertedData);
            console.log("seeding 'households'");
        }

        console.log(`Data for ${filename} has been seeded successfully`);
    } catch (error) {
        console.error('Error seeding data:', error);
        throw error;
    }
}

const filenames = [
    'participants',
    'transactions',
    'households'
];

async function runSeed() {
    for (const filename of filenames) {
        try {
            await seedData(`${filename}.json`);
        } catch (error) {
            console.error(`Failed to seed data for ${filename}:`, error);
        }
    }
    process.exit(0);
}

runSeed();