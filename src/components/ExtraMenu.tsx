import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { bookmarks, footsteps, helpCircle } from 'ionicons/icons';

const ExtraMenu: React.FC = () => {
  return (
    <IonList lines="none">
      <IonItem>
        <IonIcon aria-hidden="true" icon={footsteps} slot="start"></IonIcon>
        <IonLabel>History</IonLabel>
      </IonItem>
      <IonItem>
        <IonIcon aria-hidden="true" icon={helpCircle} slot="start"></IonIcon>
        <IonLabel>Help</IonLabel>
      </IonItem>
      <IonItem>
        <IonIcon aria-hidden="true" icon={bookmarks} slot="start"></IonIcon>
        <IonLabel>FAQ</IonLabel>
      </IonItem>
    </IonList>
  );
};

export default ExtraMenu;
