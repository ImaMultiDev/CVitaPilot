import { useState, useCallback } from "react";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const addNotification = useCallback(
    (
      type: NotificationType,
      title: string,
      message: string,
      duration: number = 5000
    ) => {
      const id = Date.now().toString();
      const notification: Notification = {
        id,
        type,
        title,
        message,
        duration,
      };

      setNotifications((prev) => [...prev, notification]);

      // Auto-remove notification after duration
      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }
    },
    [removeNotification]
  );

  const showSuccess = useCallback(
    (title: string, message: string) => {
      addNotification("success", title, message);
    },
    [addNotification]
  );

  const showError = useCallback(
    (title: string, message: string) => {
      addNotification("error", title, message);
    },
    [addNotification]
  );

  const showWarning = useCallback(
    (title: string, message: string) => {
      addNotification("warning", title, message);
    },
    [addNotification]
  );

  const showInfo = useCallback(
    (title: string, message: string) => {
      addNotification("info", title, message);
    },
    [addNotification]
  );

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
}
