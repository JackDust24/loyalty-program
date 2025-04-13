import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

export default app;
