// src/api/userService.ts
import axiosInstance from "./axiosInstance";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (data: FormData) => {
  const response = await axiosInstance.post("/users/register", data);
  return response.data;
};

//@param data - The login credentials
//@resurns - JSON response with token and user info
export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/users/login", data);
  return response.data;
};

export const getProfile = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

export const updateProfile = async (data: {
  username: string;
  avatar?: string;
}) => {
  const response = await axiosInstance.put("/users/me", data);
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

// Get all users
export const getAllUsers = async (q?: string) => {
  const url = q ? `/users/?q=${q}` : "/users";
  const response = await axiosInstance.get(url);
  return response.data;
};

export const setUserOnlineStatus = async (
  userId: string,
  isOnline: boolean
) => {
  const response = await axiosInstance.patch(`/users/${userId}/status`, {
    isOnline,
  });
  return response.data;
};

// Delete user
// @param userId - The ID of the user to delete
export const deleteUser = async (userId: string) => {
  const response = await axiosInstance.delete(`/users/${userId}`);
  return response.data;
};
