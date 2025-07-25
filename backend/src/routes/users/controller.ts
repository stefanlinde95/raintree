import { type Request, type Response } from 'express';
import { db } from '../../db/index.ts';
import { eq, notExists } from 'drizzle-orm';
import { measurements, users } from '../../db/schema.ts';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(users);
    return res.json({
      success: true,
      count: result.length,
      users: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Get users failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(id)));

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      user: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Get user failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getUserWithoutMeasurements = async (
  req: Request,
  res: Response
) => {
  try {
    const results = await db
      .select()
      .from(users)
      .where(
        notExists(
          db
            .select()
            .from(measurements)
            .where(eq(measurements.patientId, users.id))
        )
      );

    res.json({
      success: true,
      count: results.length,
      users: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Get users without measurements failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Name is required',
    });
  }

  try {
    const result = await db.insert(users).values({ name });

    res.json({
      success: true,
      message: 'User created',
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Create user failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Name is required',
    });
  }

  try {
    const result = await db
      .update(users)
      .set({ name })
      .where(eq(users.id, Number(id)));
    res.json({
      success: true,
      message: 'User updated',
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Update user failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.delete(users).where(eq(users.id, Number(id)));

    res.json({
      success: true,
      message: 'User deleted',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Delete user failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
