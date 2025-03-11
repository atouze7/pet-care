import { api } from "../uitls/api";

export async function getUserById(userId) {
  try {
    const result = await api.get(`/users/user/${userId}`);
    return result.data;
  } catch (error) {
    console.error("Error response headers:", error.response?.headers);
    console.error("Error response status:", error.response?.status);
    console.error("Error response data:", error.response?.data);
    throw error; // Re-throw the error to be handled by the calling function
  }

  /*throw error;
  }*/
}

export async function registerUser(user) {
  try {
    const result = await api.post("/users/register", user);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function changeUserPassword(
  userId,
  currentPassword,
  newPassword,
  confirmNewPassword
) {
  try {
    const requestData = { currentPassword, newPassword, confirmNewPassword };
    const result = await api.put(
      `/users/user/${userId}/change-password`,
      requestData
    );
    return result.data;
  } catch (error) {
    throw error;
  }
}
export async function updateUser(userData, userId) {
  try {
    const response = await api.put(`/users/user/${userId}/update`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/users/user/${userId}/delete`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function countVets() {
  try {
    const result = await api.get("/users/count/vets");
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function countPatients() {
  try {
    const result = await api.get("/users/count/patients");
    console.log("Patients :", result.data);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function countUsers() {
  try {
    const result = await api.get("/users/count/users");
    return result.data;
  } catch (error) {
    throw error;
  }
}

export const getAggregateUsersByMonthAndType = async () => {
  try {
    const response = await api.get("/users/aggregated-users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAggregatedUsersAccountByActiveStatus = async () => {
  try {
    const response = await api.get("/users/account/aggregated-by-status");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const aggregateVetBySpecialization = async () => {
  try {
    const response = await api.get("/vets/vet/get-by-specialization");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* This function disables a user account */
export async function lockUserAccount(userId) {
  try {
    const result = await api.put(`/users/account/${userId}/lock-user-account`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

/* This function disables a user account */
export async function unLockUserAccount(userId) {
  try {
    const result = await api.put(
      `/users/account/${userId}/unLock-user-account`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
}
