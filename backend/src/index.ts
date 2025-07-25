import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users/index.ts';
import measurementsRouter from './routes/measurements/index.ts';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/measurements', measurementsRouter);

app.listen(process.env.PORT || 4321, () => {
  console.log(`Server is running on port ${process.env.PORT || 4321}`);
});
