import {
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
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import headerImg from '../assets/images/dashboard-header.jpg';

const DashboardPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="tab-header">
        <IonToolbar style={{ background: 'transparent', display: 'flex', justifyContent: 'center' }}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle
            className="ion-text-center"
            style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            Dashboard
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonImg src={headerImg} alt="Header Image" />
        <IonGrid></IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
