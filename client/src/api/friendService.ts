import axiosInstance from "./axiosInstance";

export const getAllFriends = async () => {
  const response = await axiosInstance.get("/friend");
  return response.data;
};

export const getFriendRequest = async () => {
  const response = await axiosInstance.get("/friend/request");
  return response.data;
};

export const sendFriendRequest = async (recipientId: string) => {
  const response = await axiosInstance.post("/friend/send", {
    recipientId,
  });
  return response.data;
};

export const cancelFriendRequest = async (recipientId: string) => {
  const response = await axiosInstance.post("/friend/cancel", { recipientId });
  return response.data;
};

export const acceptFriendRequest = async (senderId: string) => {
  const response = await axiosInstance.post("/friend/accept", { senderId });
  return response.data;
};

export const rejectFriendRequest = async (senderId: string) => {
  const response = await axiosInstance.post("/friend/reject", {
    senderId,
  });
  return response.data;
};

export const removeFriendRequest = async (senderId: string) => {
  const response = await axiosInstance.post("/friend/remove", {
    senderId,
  });
  return response.data;
};
