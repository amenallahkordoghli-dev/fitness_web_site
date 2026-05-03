import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import "../styles/Notification.css";

export default function Notification() {
  const { notification } = useContext(NotificationContext);

  if (!notification) return null;

  return (
    <div className="notification">
      {notification}
    </div>
  );
}