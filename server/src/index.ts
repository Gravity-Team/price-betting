import express, { Express } from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './utils/connectDB';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import path from 'path';
import * as fs from 'fs';

config();

const PORT = process.env.PORT || 5000;
const app: Express = express();

app.use(
    morgan('common', {
        stream: fs.createWriteStream(path.resolve(__dirname, 'access.log'), {
            flags: 'a',
        }),
    })
);

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL || '');
        app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
    } catch (err) {
        console.log(err);
    }
};

start();
