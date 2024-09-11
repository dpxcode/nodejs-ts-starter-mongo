import fs from 'fs';
import path from 'path';
import connectDB from '../config/v1/mongo';

const models: { [key: string]: any } = {};

const registerModels = (version: string): void => {
    const modelsPath = path.join(__dirname, '..', 'resources', version);
    if (fs.existsSync(modelsPath)) {
        fs.readdirSync(modelsPath).forEach((folder) => {
            const modelPath = path.join(modelsPath, folder, `${folder}.model.ts`);
            if (fs.existsSync(modelPath)) {
                const model = require(modelPath).default;
                models[`${version}_${folder}`] = model;
            }
        });
    }
};

const initializeModels = async (): Promise<void> => {
    await connectDB();
    ['v1'].forEach(registerModels);
};

export default initializeModels;