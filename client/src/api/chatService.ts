import axiosInstance from "./axiosInstance";

export const getAllChats = async () => {
  const response = await axiosInstance.get("/chat");
  return response.data;
};

export const createChatConnection = async (contactId: string) => {
  const response = await axiosInstance.post("/chat/create", { contactId });
  return response.data;
};

export const getMessagesByChatId = async (chatId: string) => {
  const response = await axiosInstance.get(`/message/${chatId}`);
  return response.data;
};
