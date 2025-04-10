import express from 'express';
import { Request, Response, RequestHandler } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './routes/user';
import { supabase } from './db/client';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

export default app;
