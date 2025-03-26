import { useEffect } from 'react';

const TelegramWebAppCheck = () => {
  useEffect(() => {
    // Check if the app is running inside Telegram Web App
    if (!(window as any).Telegram || !(window as any).Telegram?.WebApp) {
      // If not in Telegram, display a message or redirect the user
      alert('This app can only be used inside Telegram');
      // Optionally, redirect the user (e.g., to a specific page or homepage)
      window.location.href = 'https://t.me/efotask_bot'; // Redirect to your bot or a page
    } else {
      // Initialize Telegram Web App
      const webApp = (window as any).Telegram.WebApp;
      webApp.ready();
    }
  }, []);

  return <div>App is working inside Telegram Web App</div>;
};

export default TelegramWebAppCheck;
