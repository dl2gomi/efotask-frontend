import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { HeaderMenu } from '../components';
import { Route, RouteComponentProps, useLocation } from 'react-router';
import { grid, home, peopleSharp, person, rocket, wallet } from 'ionicons/icons';
import { StakePage, HomePage, BalancePage, ProfilePage, DashboardPage, TaskListPage } from '.';

const MainTabs: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tabs/home" render={() => <HomePage />} />
          <Route exact path="/tabs/tasks" render={() => <TaskListPage />} />
          <Route exact path="/tabs/rewards" render={() => <StakePage />} />
          <Route exact path="/tabs/dashboard" render={() => <DashboardPage />} />
          <Route exact path="/tabs/refer" render={() => <ProfilePage />} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/tabs/home" aria-label="Home">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tasks" href="/tabs/tasks" aria-label="Tasks">
            <IonIcon aria-hidden="true" icon={wallet} />
            <IonLabel>Tasks</IonLabel>
          </IonTabButton>
          <IonTabButton tab="dashboard" href="/tabs/dashboard" aria-label="Dashboard"></IonTabButton>
          <IonTabButton tab="rewards" href="/tabs/rewards" aria-label="Rewards">
            <IonIcon aria-hidden="true" icon={person} />
            <IonLabel>Rewards</IonLabel>
          </IonTabButton>
          <IonTabButton tab="refer" href="/tabs/refer" aria-label="Refer">
            <IonIcon aria-hidden="true" icon={rocket} />
            <IonLabel>Refer</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      {location.pathname.startsWith('/tabs') && (
        <IonFab vertical="bottom" horizontal="center">
          <IonFabButton routerLink="/tabs/dashboard" routerDirection="none">
            <IonIcon icon={grid} style={{ color: '#fff' }} />
          </IonFabButton>
        </IonFab>
      )}
    </>
  );
};

export default MainTabs;
