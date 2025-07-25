type Method = "GET" | "POST" | "PUT" | "DELETE";

const serverRootUrl = import.meta.env.VITE_SERVER_URL;

export const apiEndpoints = {
  getMeasurementPath: (id: string) => `${serverRootUrl}/api/measurements/${id}`,
  createMeasurementsPath: () => `${serverRootUrl}/api/measurements`,
  updateMeasurementsPath: (id: string) =>
    `${serverRootUrl}/api/measurements/${id}`,
  deleteMeasurementPath: (uuid: string) =>
    `${serverRootUrl}/api/measurements/${uuid}`,
  getUsersPath: () => `${serverRootUrl}/api/users`,
  getUserWithoutMeasurementsPath: () =>
    `${serverRootUrl}/api/users/without-measurements`,
  getUserPath: (id: number) => `${serverRootUrl}/api/users/${id}`,
  getUserMeasurementsPath: (id: number) =>
    `${serverRootUrl}/api/users/${id}/measurements`,
  createUsersPath: () => `${serverRootUrl}/api/users`,
  updateUsersPath: (id: number) => `${serverRootUrl}/api/users/${id}`,
  deleteUsersPath: (id: number) => `${serverRootUrl}/api/users/${id}`,
};

export const requests = {
  getMeasurement: async (id: string) =>
    request(apiEndpoints.getMeasurementPath(id), "GET"),
  createMeasurement: async (weight: string, patientId: number) =>
    request(apiEndpoints.createMeasurementsPath(), "POST", {
      weight,
      patientId,
    }),
  updateMeasurements: async (id: string, weight: number) =>
    request(apiEndpoints.updateMeasurementsPath(id), "PUT", { weight }),
  deleteMeasurement: async (uuid: string) =>
    request(apiEndpoints.deleteMeasurementPath(uuid), "DELETE"),
  getUsers: () => request(apiEndpoints.getUsersPath(), "GET"),
  getUserWithoutMeasurements: () =>
    request(apiEndpoints.getUserWithoutMeasurementsPath(), "GET"),
  getUser: (id: number) => request(apiEndpoints.getUserPath(id), "GET"),
  getUserMeasurements: (id: number) =>
    request(apiEndpoints.getUserMeasurementsPath(id), "GET"),
  createUsers: (name: string) =>
    request(apiEndpoints.createUsersPath(), "POST", { name }),
  updateUsers: (id: number) => request(apiEndpoints.updateUsersPath(id), "PUT"),
  deleteUser: (id: number) =>
    request(apiEndpoints.deleteUsersPath(id), "DELETE"),
};

export const request = async (
  endpoint: string,
  method: Method,
  body?: Record<string, unknown>
) => {
  const response = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Unknown error");

    if (data.errorType) {
      error.cause = data.errorType;
    }

    throw error;
  }

  return data;
};
