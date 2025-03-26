import React from 'react';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonToggle,
} from '@ionic/react';
import {
  calendarOutline,
  hammer,
  moonOutline,
  help,
  informationCircleOutline,
  logIn,
  logOut,
  mapOutline,
  peopleOutline,
  person,
  personAdd,
  home,
  wallet,
  homeOutline,
  walletOutline,
  personOutline,
  grid,
  gridOutline,
  rocketOutline,
  logInOutline,
  personAddOutline,
  helpCircleOutline,
  barChartOutline,
  timeOutline,
} from 'ionicons/icons';
import menuImg from '../assets/images/menu-header.jpg';
import '../assets/styles/paneMenu.css';

const routes = {
  appPages: [
    { title: 'Home', path: '/tabs/home', icon: homeOutline },
    { title: 'Balance', path: '/tabs/balance', icon: walletOutline },
    { title: 'Dashboard', path: '/tabs/dashboard', icon: gridOutline },
    { title: 'Staking', path: '/tabs/stake', icon: rocketOutline },
    { title: 'Profile', path: '/tabs/profile', icon: personOutline },
  ],
};

interface Page {
  title: string;
  path: string;
  icon: string;
  routerDirection?: string;
}

const PaneMenu: React.FC = () => {
  const location = useLocation();

  function renderlistItems(list: Page[]) {
    return list
      .filter((route) => !!route.path)
      .map((p) => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem
            detail={false}
            routerLink={p.path}
            routerDirection="none"
            className={location.pathname.startsWith(p.path) ? 'selected' : undefined}
          >
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="push" contentId="main">
      <IonHeader>
        <IonImg src={menuImg} alt="Menu Header"></IonImg>
      </IonHeader>
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>Pages</IonListHeader>
          {renderlistItems(routes.appPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Account</IonListHeader>
          <IonMenuToggle key="Login" auto-hide="false">
            <IonItem
              detail={false}
              routerLink="/login"
              routerDirection="none"
              className={location.pathname.startsWith('/login') ? 'selected' : undefined}
            >
              <IonIcon slot="start" icon={logInOutline} />
              <IonLabel>Log In</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle key="Signup" auto-hide="false">
            <IonItem
              detail={false}
              routerLink="/signup"
              routerDirection="none"
              className={location.pathname.startsWith('/signup') ? 'selected' : undefined}
            >
              <IonIcon slot="start" icon={personAddOutline} />
              <IonLabel>Sign Up</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        <IonList lines="none">
          <IonListHeader>Others</IonListHeader>
          <IonMenuToggle key="History" auto-hide="false">
            <IonItem>
              <IonIcon slot="start" icon={timeOutline} />
              <IonLabel>History</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle key="About" auto-hide="false">
            <IonItem>
              <IonIcon slot="start" icon={helpCircleOutline} />
              <IonLabel>About</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default PaneMenu;
