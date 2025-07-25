import { type Request, type Response } from 'express';
import { db } from '../../db/index.ts';
import { eq } from 'drizzle-orm';
import { measurements, users } from '../../db/schema.ts';

export const getUserMeasurements = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'User ID is required',
    });
  }

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(id)));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        errorType: 'USER_NOT_FOUND',
      });
    }

    const [result] = await db
      .select({
        id: measurements.id,
        weight: measurements.weight,
        patientId: measurements.patientId,
        createdAt: measurements.createdAt,
        updatedAt: measurements.updatedAt,
        patientName: users.name,
      })
      .from(measurements)
      .innerJoin(users, eq(measurements.patientId, users.id))
      .where(eq(measurements.patientId, Number(id)));

    if (!result) {
      return res.status(404).json({
        success: false,
        message: `${user.name} has no measurements`,
        errorType: 'MEASUREMENT_NOT_FOUND',
      });
    }

    res.json({
      success: true,
      measurements: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Get user measurements failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getMeasurement = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Measurement ID is required',
    });
  }

  try {
    const [result] = await db
      .select()
      .from(measurements)
      .where(eq(measurements.id, id));

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Measurement not found',
      });
    }

    res.json({
      success: true,
      measurements: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Get measurement failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createMeasurement = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: 'Request body is required',
    });
  }

  const { patientId, weight } = req.body;

  if (!patientId || !weight) {
    return res.status(400).json({
      success: false,
      message: 'Patient ID and weight are required',
    });
  }

  try {
    const result = await db.insert(measurements).values({ patientId, weight });

    res.json({
      success: true,
      message: 'Measurement created',
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Create measurement failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateMeasurement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { weight } = req.body;

  if (!weight) {
    console.error('Weight is required');
    return res.status(400).json({
      success: false,
      message: 'Weight is required',
    });
  }

  try {
    const result = await db
      .update(measurements)
      .set({ weight, updatedAt: new Date() })
      .where(eq(measurements.id, id));
    res.json({
      success: true,
      message: 'Measurement updated',
      result,
    });
  } catch (error) {
    console.error('Update measurement failed:', error);
    res.status(500).json({
      success: false,
      message: 'Measurement update failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteMeasurement = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await db.delete(measurements).where(eq(measurements.id, id));

    res.json({
      success: true,
      message: 'Measurement deleted',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Delete measurement failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
