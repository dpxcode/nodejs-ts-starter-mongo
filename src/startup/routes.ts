import express, { Application, Request, Response, NextFunction } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const routes = express.Router();

async function walk(dir: string, fileList: string[] = []): Promise<string[]> {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      fileList = await walk(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}


function registerRoutes(allFiles: string[], routes: express.Router): void {
  allFiles.forEach(file => {
    if (file.includes('route')) {
      const fileNameArray = file.split(path.sep);
      const routeName = fileNameArray[fileNameArray.length - 2]; // Get the directory name before the file name
      console.log('registering route: ', routeName);
      const routePath = file; // Use the absolute path directly
      routes.use(`/${routeName}`, require(routePath).default);
    }
  });
}



export default async function (app: Application): Promise<void> {
  let allFiles = await walk(path.join(__dirname, '../resources/v1'));
  
  // Register v1 routes here
  registerRoutes(allFiles, routes);

  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send({
      msg: 'everything is working fine.',
      host: req.get('host'),
    });
  });

  app.use('/api/v1', routes);

  app.route('*').all((req: Request, res: Response) => {
    return res.status(404).send({
      msg: `'${req.originalUrl}' is not a valid endpoint. please check the request URL and try again.`
    });
  });
}