import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "../services/notificationApi";
import "./Notifications.css";

interface Notification {
  id: number;
  message: string;
  notification_type?: string;
  is_read: boolean;
  created_at?: string;
  sender?: {
    id?: number;
    username?: string;
    avatar?: string;
  };
}

const Notifications = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();

      // Django pagination can return { results: [...] }
      setNotifications(data.results || data || []);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkRead = async (id: number) => {
    try {
      await markNotificationRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          is_read: true,
        }))
      );
    } catch (error) {
      console.error("Failed to mark all notifications:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "";

    return new Date(date).toLocaleString();
  };

  return (
    <div className="notificationsPage">

      {/* Header */}

      <div className="notificationsHeader">

        <div>
          <h1>Notifications</h1>

          <p>
            Stay updated with your latest activity
          </p>
        </div>

        <button
          className="markAllBtn"
          onClick={handleMarkAllRead}
        >
          Mark all as read
        </button>

      </div>


      {/* Notifications */}

      <div className="notificationsList">

        {loading ? (
          <div className="notificationEmpty">
            <p>Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="notificationEmpty">
            <div className="emptyBell">🔔</div>

            <h3>No notifications yet</h3>

            <p>
              When someone interacts with your posts,
              you'll see notifications here.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (

            <div
              key={notification.id}
              className={`notificationCard ${
                notification.is_read
                  ? "read"
                  : "unread"
              }`}
            >

              {/* Icon */}

              <div className="notificationIcon">
                🔔
              </div>


              {/* Content */}

              <div className="notificationContent">

                <div className="notificationMessage">

                  {notification.sender?.username && (
                    <strong>
                      {notification.sender.username}
                    </strong>
                  )}

                  <span>
                    {notification.message}
                  </span>

                </div>

                {notification.created_at && (
                  <small>
                    {formatDate(notification.created_at)}
                  </small>
                )}

              </div>


              {/* Actions */}

              <div className="notificationActions">

                {!notification.is_read && (
                  <button
                    className="readBtn"
                    onClick={() =>
                      handleMarkRead(notification.id)
                    }
                    title="Mark as read"
                  >
                    ✓
                  </button>
                )}

                <button
                  className="deleteBtn"
                  onClick={() =>
                    handleDelete(notification.id)
                  }
                  title="Delete notification"
                >
                  🗑
                </button>

              </div>

            </div>

          ))
        )}

      </div>


      {/* Back */}

      <button
        className="backNotificationsBtn"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>

    </div>
  );
};

export default Notifications;