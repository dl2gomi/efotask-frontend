import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonRouter,
} from '@ionic/react';
import { HeaderMenu } from '../../components';
import { Route, RouteComponentProps, useLocation } from 'react-router';
import { card, grid, home, peopleSharp, person, rocket, settings, wallet } from 'ionicons/icons';
import { StakePage, HomePage, BalancePage, ProfilePage, DashboardPage, TaskListPage } from '..';
import { withRole } from '../../helpers';
import CreditPage from './CreditPage';

const AdvTabs: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/advs/home" render={() => <HomePage />} />
          <Route exact path="/advs/tasks" render={() => <TaskListPage />} />
          <Route exact path="/advs/dashboard" render={() => <DashboardPage />} />
          <Route exact path="/advs/credits" render={() => <CreditPage />} />
          <Route exact path="/advs/settings" render={() => <ProfilePage />} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/advs/home" aria-label="Home">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tasks" href="/advs/tasks" aria-label="Tasks">
            <IonIcon aria-hidden="true" icon={rocket} />
            <IonLabel>Tasks</IonLabel>
          </IonTabButton>
          <IonTabButton tab="dashboard" href="/advs/dashboard" aria-label="Dashboard"></IonTabButton>
          <IonTabButton tab="credits" href="/advs/credits" aria-label="Credits">
            <IonIcon aria-hidden="true" icon={card} />
            <IonLabel>Credits</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/advs/settings" aria-label="Settings">
            <IonIcon aria-hidden="true" icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      {location.pathname.startsWith('/advs') && (
        <IonFab vertical="bottom" horizontal="center">
          <IonFabButton routerLink="/advs/dashboard" routerDirection="none">
            <IonIcon icon={grid} style={{ color: '#fff' }} />
          </IonFabButton>
        </IonFab>
      )}
    </>
  );
};

export default withRole(AdvTabs, 'advertiser');
