import { useEffect, useState } from 'react';

const useTelegramUser = (): any => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const checkTelegramSDK = () => {
      if ((window as any).Telegram && (window as any).Telegram.WebApp) {
        const userData = (window as any).Telegram.WebApp.initDataUnsafe;
        setUserInfo({
          id: userData.user.id,
          username: userData.user.username || null,
        });
        clearInterval(intervalId);
      }
    };

    // Initial check for the SDK availability
    checkTelegramSDK();

    // Check periodically until the SDK is available
    const intervalId = setInterval(() => {
      checkTelegramSDK();
    }, 1000); // Check every second

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect only runs once

  return userInfo;
};

export default useTelegramUser;
