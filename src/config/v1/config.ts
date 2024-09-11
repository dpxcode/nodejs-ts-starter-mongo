interface Config {
  env: string;
  port: string;
  noolapp_token?: string;
  redis_url?: string;
  redis_port?: string;
  api_ver?: string;
  mongo_srv: string;
  cors_whitelist: string[];
}

const CONFIG: Config = {
  env: process.env.ENV || 'dev',
  port: process.env.PORT || '3000',
  noolapp_token: process.env.NOOLAPP_TOKEN,
  redis_url: process.env.REDIS_URL,
  redis_port: process.env.REDIS_PORT,
  api_ver: process.env.API_VER,
  mongo_srv: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/noolapp-local",
  cors_whitelist: [],
};

if (CONFIG.env === 'prod' || CONFIG.env === 'production') {
  CONFIG.cors_whitelist = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:8000',
    'http://localhost:8001',
    'http://localhost:8002',
    'http://localhost:8003',
    'http://localhost:8080',
    'http://localhost:8081',
    'http://localhost:8082',
    'http://localhost:8083',
    'http://localhost:6969',
  ];
} else if (CONFIG.env === 'stag' || CONFIG.env === 'staging') {
  CONFIG.cors_whitelist = [
    // Add staging CORS whitelist URLs here
  ];
}

export default CONFIG;