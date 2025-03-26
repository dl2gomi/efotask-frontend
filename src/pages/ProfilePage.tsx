import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add, documentText, help, helpBuoy, helpCircle, notifications, shield, time } from 'ionicons/icons';
import headerImg from '../assets/images/profile-header.jpg';
import '../assets/styles/profilePage.css';

const ProfilePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="tab-header">
        <IonToolbar style={{ background: 'transparent', display: 'flex', justifyContent: 'center' }}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonImg src={headerImg} alt="Header Image" />
        <IonGrid style={{ marginTop: '-6rem' }}>
          <IonRow>
            <IonCol>
              <IonCard className="portfolio-card">
                <IonCardContent>
                  <div className="background-shapes"></div>
                  <IonRow>
                    <IonCol className="ion-justify-content-center" style={{ display: 'flex' }}>
                      <IonAvatar>
                        <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Avatar" />
                      </IonAvatar>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol
                      size="12"
                      className="ion-text-center"
                      style={{
                        paddingBottom: 0,
                      }}
                    >
                      <h1 style={{ fontWeight: 'bold' }}>Denis Lee</h1>
                    </IonCol>
                    <IonCol
                      size="12"
                      className="ion-text-center"
                      style={{
                        paddingTop: 0,
                      }}
                    >
                      host@example.com
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonList lines="none">
          <IonItem detail>
            <IonIcon icon={time} slot="start" />
            <IonLabel>History</IonLabel>
          </IonItem>
          <IonItem detail>
            <IonIcon icon={shield} slot="start" />
            <IonLabel>Security</IonLabel>
          </IonItem>
          <IonItem detail>
            <IonIcon icon={notifications} slot="start" />
            <IonLabel>Notifications</IonLabel>
          </IonItem>
          <IonItem detail>
            <IonIcon icon={helpCircle} slot="start" />
            <IonLabel>Help and Support</IonLabel>
          </IonItem>
          <IonItem detail>
            <IonIcon icon={documentText} slot="start" />
            <IonLabel>Terms and Conditions</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
