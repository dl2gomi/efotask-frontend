import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  gift,
  home,
  settingsSharp,
  peopleSharp,
  wallet,
  add,
  rocketOutline,
  rocket,
  rocketSharp,
  personCircle,
  person,
} from 'ionicons/icons';
import { LoginPage, MainTabs, SignupPage } from './pages';

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
    alert(JSON.stringify(user));
  }, [user]);

  return (
    <>
      {user && (
        <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <PaneMenu />
              <IonRouterOutlet id="main">
                <Route path="/tabs" render={() => <MainTabs />} />
                <Route path="/login" render={() => <LoginPage />} />
                <Route path="/signup" render={() => <SignupPage />} />
                <Route exact path="/">
                  <Redirect to="/tabs/home" />
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      )}
      {!user && (
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
