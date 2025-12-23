import express from 'express';
import itemRoutes from './routes/itemRoutes';
import { errorHandler } from './middlewares/errorHandler';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use('/api/products', itemRoutes);

app.use(errorHandler);

export default app;