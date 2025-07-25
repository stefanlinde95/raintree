import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserWithoutMeasurements,
} from './controller.ts';
import { getUserMeasurements } from '../measurements/controller.ts';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/without-measurements', getUserWithoutMeasurements);
usersRouter.get('/:id', getUserById);
usersRouter.get('/:id/measurements', getUserMeasurements);
usersRouter.post('/', createUser);
usersRouter.put('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);

export default usersRouter;
