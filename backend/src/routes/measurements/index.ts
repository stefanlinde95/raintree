import { Router } from 'express';
import {
  createMeasurement,
  updateMeasurement,
  deleteMeasurement,
  getMeasurement,
} from './controller.ts';

const measurementsRouter = Router();

measurementsRouter.get('/:id', getMeasurement);
measurementsRouter.post('/', createMeasurement);
measurementsRouter.put('/:id', updateMeasurement);
measurementsRouter.delete('/:id', deleteMeasurement);

export default measurementsRouter;
