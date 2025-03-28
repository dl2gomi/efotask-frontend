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
import { grid, home, peopleSharp, person, rocket, wallet } from 'ionicons/icons';
import { StakePage, HomePage, BalancePage, ProfilePage, DashboardPage, TaskListPage } from '..';
import { withRole } from '../../helpers';

const AdvTabs: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/advs/home" render={() => <HomePage />} />
          <Route exact path="/advs/tasks" render={() => <TaskListPage />} />
          <Route exact path="/advs/rewards" render={() => <StakePage />} />
          <Route exact path="/advs/dashboard" render={() => <DashboardPage />} />
          <Route exact path="/advs/refer" render={() => <ProfilePage />} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/advs/home" aria-label="Home">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tasks" href="/advs/tasks" aria-label="Tasks">
            <IonIcon aria-hidden="true" icon={wallet} />
            <IonLabel>Tasks</IonLabel>
          </IonTabButton>
          <IonTabButton tab="dashboard" href="/advs/dashboard" aria-label="Dashboard"></IonTabButton>
          <IonTabButton tab="rewards" href="/tabs/rewards" aria-label="Rewards">
            <IonIcon aria-hidden="true" icon={person} />
            <IonLabel>Rewards</IonLabel>
          </IonTabButton>
          <IonTabButton tab="refer" href="/advs/refer" aria-label="Refer">
            <IonIcon aria-hidden="true" icon={rocket} />
            <IonLabel>Refer</IonLabel>
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
