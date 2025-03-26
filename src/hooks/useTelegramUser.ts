import { useState, useEffect } from 'react';

const useTelegramUser = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const checkTelegramUser = () => {
      alert(JSON.stringify((window as any).Telegram));
      if ((window as any).Telegram?.WebApp) {
        const webApp = (window as any).Telegram.WebApp;
        webApp.ready(); // Ensure WebApp is ready

        const user = webApp.initDataUnsafe?.user;
        if (user && user.id) {
          setUserId(user.id);
        } else {
          console.warn('Telegram user data is empty. Ensure you started the bot via a deep link.');
        }

        // Stop checking once Telegram is available
        if (interval) {
          clearInterval(interval);
        }
      }
    };

    // Try immediately
    checkTelegramUser();

    // Keep checking every 3000ms if Telegram is not available yet
    if (!(window as any).Telegram?.WebApp) {
      interval = setInterval(checkTelegramUser, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return userId;
};

export default useTelegramUser;
