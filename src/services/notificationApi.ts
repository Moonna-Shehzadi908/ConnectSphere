import api from "./api";

export const getNotifications = async () => {
  const response = await api.get("/notifications/");
  return response.data;
};

export const getUnreadNotificationCount = async () => {
  const response = await api.get("/notifications/unread-count/");
  return response.data;
};

export const markNotificationRead = async (
  notificationId: number
) => {
  const response = await api.patch(
    `/notifications/${notificationId}/read/`
  );

  return response.data;
};

export const markAllNotificationsRead = async () => {
  const response = await api.patch(
    "/notifications/read-all/"
  );

  return response.data;
};

export const deleteNotification = async (
  notificationId: number
) => {
  const response = await api.delete(
    `/notifications/${notificationId}/`
  );

  return response.data;
};