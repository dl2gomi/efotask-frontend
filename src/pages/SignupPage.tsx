import React, { useRef, useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonInput,
  IonText,
  IonImg,
  IonInputPasswordToggle,
  IonNavLink,
  IonRouterLink,
  IonIcon,
  IonBackButton,
} from '@ionic/react';
import '../assets/styles/login.css';
import logoImg from '../assets/images/logo320.png';
import { RouteComponentProps } from 'react-router';
import { logoGoogle } from 'ionicons/icons';

const SignupPage: React.FC = () => {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollTop = useRef(0);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleScroll = (event: CustomEvent) => {
    const scrollTop = event.detail.scrollTop;

    if (scrollTop > lastScrollTop.current) {
      setIsHidden(true); // Scrolling down → hide toolbar
    } else {
      setIsHidden(false); // Scrolling up → show toolbar
    }

    lastScrollTop.current = scrollTop; // Update last scroll position
  };

  // const login = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setFormSubmitted(true);
  //   if (!username) {
  //     setUsernameError(true);
  //   }
  //   if (!password) {
  //     setPasswordError(true);
  //   }

  //   if (username && password) {
  //     await setIsLoggedIn(true);
  //     await setUsernameAction(username);
  //     history.push('/tabs/schedule', { direction: 'none' });
  //   }
  // };

  return (
    <IonPage className="login-page">
      <IonHeader className={`tab-header ${isHidden ? 'toolbar-hidden' : ''}`}>
        <IonToolbar style={{ background: 'transparent', display: 'flex', justifyContent: 'center' }}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/home" />
          </IonButtons>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        style={{
          backgroundImage: 'url(assets/images/back1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '--background': 'transparent',
        }}
        scrollEvents={true}
        onIonScroll={handleScroll}
      >
        <IonRow style={{ paddingTop: '3rem' }}>
          <IonCol size="4" offset="4" className="ion-margin-vertical">
            <IonImg src={logoImg} alt="CBB Logo"></IonImg>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="ion-text-center ion-margin-bottom">
            <IonText>
              <h1 style={{ fontFamily: 'fantasy' }}>CYE BINARY BUSINESS</h1>
            </IonText>
          </IonCol>
        </IonRow>
        <form>
          <IonRow>
            <IonCol size="10" offset="1">
              <IonInput
                label="Full Name"
                labelPlacement="floating"
                fill="outline"
                placeholder="Enter your name"
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="10" offset="1">
              <IonInput
                label="Email"
                labelPlacement="floating"
                fill="outline"
                placeholder="Enter your email"
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="10" offset="1">
              <IonInput
                label="Password"
                type="password"
                labelPlacement="floating"
                fill="outline"
                placeholder="Enter your password"
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="10" offset="1">
              <IonInput
                label="Confirm Password"
                type="password"
                labelPlacement="floating"
                fill="outline"
                placeholder="Re-check your password"
              ></IonInput>
            </IonCol>
          </IonRow>
          <hr />
          <IonRow>
            <IonCol size="10" offset="1">
              <IonButton
                expand="block"
                type="submit"
                style={{ height: '3rem', color: 'white' }}
                className="ion-border-radius"
              >
                Sign Up
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonRouterLink routerLink="/login" routerDirection="none" color="light">
                Already have an account? Please log in
              </IonRouterLink>
            </IonCol>
          </IonRow>
        </form>
        <IonRow className="ion-margin-top">
          <IonCol size="10" offset="1">
            <IonButton expand="block" style={{ height: '3rem' }} color="tertiary">
              <IonIcon icon={logoGoogle} className="ion-padding-end"></IonIcon>
              Sign Up with Google
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
