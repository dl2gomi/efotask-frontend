import { useEffect, useState } from 'react';

const useTelegramUser = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready();

      const user = webApp.initDataUnsafe; // User data from Telegram Web App
      if (user) {
        setUserId(user.user.id); // Set user ID from Web App data
      }
    }
  }, []);

  return userId;
};

export default useTelegramUser;
