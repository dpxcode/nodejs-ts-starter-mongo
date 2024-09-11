import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Application } from 'express';

// custom req
import CONFIG from '../config/v1/config'; 

export default function (app: Application): void {
    console.log('loading startup files');
    app.use(helmet());

    // dev environment configurations
    if (CONFIG.env === 'dev' || CONFIG.env === 'development') {
        app.use(morgan('tiny'));

        console.log('approved domains for development: ', CONFIG.cors_whitelist);
        console.log('development mode active....');
    }

    app.use(cors({ origin: CONFIG.cors_whitelist }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}