import { IonButton, IonButtons, IonContent, IonIcon, useIonPopover } from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical, notifications, wallet } from 'ionicons/icons';
import ExtraMenu from './ExtraMenu';

const HeaderMenu: React.FC = () => {
  const [present, dismiss] = useIonPopover(ExtraMenu, {
    onDismiss: (data: any, role: string) => dismiss(data, role),
  });

  return (
    <IonButtons slot="primary">
      <IonButton>
        <IonIcon slot="icon-only" ios={wallet} md={wallet}></IonIcon>
      </IonButton>
      <IonButton>
        <IonIcon slot="icon-only" ios={notifications} md={notifications}></IonIcon>
      </IonButton>
      <IonButton
        onClick={(e: any) => {
          present({
            event: e,
            onDidDismiss: (e: CustomEvent) => console.log(`Popover dismissed with role: ${e.detail.role}`),
          });
        }}
      >
        <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
      </IonButton>
    </IonButtons>
  );
};

export default HeaderMenu;
