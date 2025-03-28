import React, { useEffect, useRef, useState } from 'react';
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
  IonGrid,
  IonAlert,
  useIonToast,
  useIonRouter,
} from '@ionic/react';
import '../assets/styles/login.css';
import logoImg from '../assets/images/logo320.png';
import { RouteComponentProps } from 'react-router';
import { cash, checkmark, checkmarkCircle, closeCircle, logoGoogle, people } from 'ionicons/icons';
import { useApiRequest, useTelegramUser } from '../hooks';
import { selectRoleUrl } from '../consts/paths';
import { SpinnerCircular } from 'spinners-react';
import { withRole } from '../helpers';

const StartedPage: React.FC = () => {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollTop = useRef(0);
  const user = useTelegramUser();
  const [toast] = useIonToast();
  const router = useIonRouter();

  const {
    response: roleResponse,
    error: roleError,
    loading: roleLoading,
    sendRequest: sendRoleRequest,
  } = useApiRequest({
    endpoint: selectRoleUrl,
    method: 'POST',
    headers: {
      'X-Telegram-Id': user?.user?.id,
    },
  });

  const handleScroll = (event: CustomEvent) => {
    const scrollTop = event.detail.scrollTop;

    if (scrollTop > lastScrollTop.current) {
      setIsHidden(true); // Scrolling down → hide toolbar
    } else {
      setIsHidden(false); // Scrolling up → show toolbar
    }

    lastScrollTop.current = scrollTop; // Update last scroll position
  };

  useEffect(() => {
    roleResponse &&
      roleResponse.data &&
      toast({ message: roleResponse.message, duration: 2000, color: 'success', icon: checkmarkCircle, animated: true });
    roleResponse && roleResponse.data.role === 'earner' && router.push('/tabs/home');
    roleResponse && roleResponse.data.role === 'advertiser' && router.push('/advs/home');
  }, [roleResponse]);

  useEffect(() => {
    roleError &&
      toast({ message: roleError.message, duration: 2000, color: 'danger', icon: closeCircle, animated: true });
  }, [roleError]);

  return (
    <IonPage className="login-page">
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
        <IonGrid style={{ fontFamily: 'Arial' }}>
          <IonRow style={{ paddingTop: '3rem' }}>
            <IonCol size="4" offset="4" className="ion-margin-vertical">
              <IonImg src={logoImg} alt="EFO Logo"></IonImg>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonText>
                <h1 style={{ fontFamily: 'fantasy' }}>SELECT YOUR ROLE</h1>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center ion-margin-bottom">
              <IonText>
                <IonText color="warning">Once you select the role, you cannot change it forever.</IonText>
              </IonText>
            </IonCol>
          </IonRow>
          {!roleLoading && (
            <>
              <IonRow>
                <IonCol className="ion-text-center" style={{ padding: '0 1rem 0 1rem' }}>
                  <IonButton expand="block" fill="outline" id="earnerButton">
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '1rem 0',
                      }}
                    >
                      <IonIcon icon={cash} style={{ fontSize: '6rem' }}></IonIcon>
                      <IonText className="ion-margin-top" color="light">
                        Earner
                      </IonText>
                    </div>
                  </IonButton>
                  <IonAlert
                    header="Select Earner Role"
                    trigger="earnerButton"
                    message="Are you sure you want to select Earner role?"
                    buttons={[
                      {
                        text: 'OK',
                        role: 'confirm',
                        handler: () => {
                          sendRoleRequest({ role: 'earner' });
                        },
                      },
                      {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {},
                      },
                    ]}
                  ></IonAlert>
                </IonCol>
                <IonCol className="ion-text-center" style={{ padding: '0 1rem 0 1rem' }}>
                  <IonButton expand="block" fill="outline" id="advertiserButton">
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '1rem 0',
                      }}
                    >
                      <IonIcon icon={people} style={{ fontSize: '6rem' }}></IonIcon>
                      <IonText className="ion-margin-top" color="light">
                        Advertiser
                      </IonText>
                    </div>
                  </IonButton>
                  <IonAlert
                    header="Select Advertiser Role"
                    trigger="advertiserButton"
                    message="Are you sure you want to select Advertiser role?"
                    buttons={[
                      {
                        text: 'OK',
                        role: 'confirm',
                        handler: () => {
                          sendRoleRequest({ role: 'advertiser' });
                        },
                      },
                      {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {},
                      },
                    ]}
                  ></IonAlert>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol style={{ padding: '0 1rem' }}>
                  <div style={{ lineHeight: '1.4rem', padding: '0.5rem 0' }}>
                    If you want to advertise your channel, you can select <IonText color="success">ADVERTISER</IonText>{' '}
                    role. You need to pay some funds to advertise in this bot.
                  </div>
                  <div style={{ lineHeight: '1.4rem', padding: '0.5rem 0' }}>
                    If you want to earn from online, you can select <IonText color="success">EARNER</IonText> role. You
                    can earn $EARN credits by joining channels advertised in this bot.
                  </div>
                </IonCol>
              </IonRow>
            </>
          )}
          {roleLoading && (
            <>
              <IonRow>
                <IonCol className="ion-text-center">
                  <SpinnerCircular color="violet" size="80"></SpinnerCircular>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="ion-text-center">
                  <IonText>Selecting Role...</IonText>
                </IonCol>
              </IonRow>
            </>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default withRole(StartedPage, null);
