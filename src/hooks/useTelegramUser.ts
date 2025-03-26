import { useEffect, useState } from 'react';

const useTelegramUser = (): any => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const checkTelegramSDK = () => {
      if ((window as any).Telegram && (window as any).Telegram.WebApp) {
        const userData = (window as any).Telegram.WebApp.initDataUnsafe;
        console.log(userData);
        setUserInfo(userData);

        // Clear the interval once the user info is successfully loaded
        clearInterval(intervalId);
      }
    };

    // Initial check immediately
    checkTelegramSDK();

    // Check periodically every second
    const intervalId = setInterval(checkTelegramSDK, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect only runs once

  return userInfo;
};

export default useTelegramUser;
