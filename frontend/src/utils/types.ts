export type User = {
  id: number;
  name: string;
};

export type Measurement = {
  id: string;
  weight: number;
  patientId: number;
  createdAt: string;
  updatedAt: string;
};

export type UsersResponse = {
  success: boolean;
  count: number;
  users: User[];
};

export type UserMeasurementResponse = {
  success: true;
  measurements: Measurement & { patientName: string };
  message?: string;
};
