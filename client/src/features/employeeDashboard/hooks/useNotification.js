import { useState } from "react";

const useNotification = (duration = 4000) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), duration);
  };

  return { notification, showNotification };
};

export default useNotification;