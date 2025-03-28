import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { LoginPage, MainTabs, SignupPage, StartedPage, AdvTabs } from './pages';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

import '@ionic/react/css/palettes/dark.always.css';
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './assets/styles/custom.css';
import { PaneMenu } from './components';
import { useTelegramUser } from './hooks';
import { SpinnerCircular } from 'spinners-react';
import { useEffect } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const user = useTelegramUser();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      (window as any).Telegram.WebApp.mockData = {
        query_id: 'AAGmFXQLAwAAAKYVdAuYqceg',
        user: {
          id: 6634608038,
          first_name: 'D',
          last_name: 'L',
          username: 'dlgomi',
          language_code: 'en',
          allows_write_to_pm: true,
          photo_url: 'https://t.me/i/userpic/320/Hk6Rf53N8Oos-IaV0A5gMLBQN3ECGg-krzsKN9K-kWhbjUD2vnmaiHVcxNiKAnAi.svg',
        },
        auth_date: '1743015912',
        signature: 'Vdjmb6l26d6Wg78Vc8y3yPXZUhwK3YSf9ZMn_Wc4A_W4Z961ujg17EI142EUjSXHqEGK6wd9OwMyIWQRjXMGAA',
        hash: '5fba3c5bee57842f5b897733fef6b098a782a8208c36c697e2847d87b45905aa',
      };
    }
  }, []);

  return (
    <>
      {user?.user && (
        <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <PaneMenu />
              <IonRouterOutlet id="main">
                <Route path="/tabs" render={() => <MainTabs />} />
                <Route path="/advs" render={() => <AdvTabs />} />
                <Route path="/login" render={() => <LoginPage />} />
                <Route path="/getstarted" render={() => <StartedPage />} />
                <Route path="/signup" render={() => <SignupPage />} />
                <Route exact path="/">
                  <Redirect to="/tabs/home" />
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      )}
      {!user?.user && (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <SpinnerCircular color="#9032F0" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>LOADING...</div>
        </div>
      )}
    </>
  );
};

export default App;
