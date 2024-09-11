import dotenv from 'dotenv';
dotenv.config();

interface Config {
    mongo_srv: string | undefined;
}

interface Configurations {
    development: Config;
    staging: Config;
    uat: Config;
    production: Config;
}

const configurations: Configurations = {
    development: {
        mongo_srv: process.env.MONGO_SRV,
    },
    staging: {
        mongo_srv: process.env.MONGO_SRV,
    },
    uat: {
        mongo_srv: process.env.MONGO_SRV,
    },
    production: {
        mongo_srv: process.env.MONGO_SRV,
    }
};

export default configurations;