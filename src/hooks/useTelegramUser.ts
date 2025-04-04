import { useEffect, useState } from 'react';

const useTelegramUser = (): any => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    const checkTelegramSDK = () => {
      if ((window as any).Telegram && (window as any).Telegram.WebApp) {
        const userData =
          process.env.NODE_ENV === 'development'
            ? (window as any).Telegram.WebApp.mockData
            : (window as any).Telegram.WebApp.initDataUnsafe;
        setUserInfo(userData);

        // Clear the interval once the user info is successfully loaded
        clearInterval(intervalId);
      }
    };

    // Initial check immediately
    checkTelegramSDK();

    // Check periodically every second
    intervalId = setInterval(checkTelegramSDK, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect only runs once

  return userInfo;
};

export default useTelegramUser;
