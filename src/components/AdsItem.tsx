import { IonAvatar, IonBadge, IonImg, IonItem, IonLabel, IonNote } from '@ionic/react';
import '../assets/styles/adsItem.css';

const AdsItem: React.FC<any> = ({ ads }) => {
  return (
    <IonItem routerLink={`/advs/ads/${ads.id}`} style={{ margin: 0 }} detail>
      <IonAvatar aria-hidden="true" slot="start">
        <IonImg alt="" src={ads.avatarUrl} />
      </IonAvatar>
      <div>
        <IonLabel style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
          {ads.channelName}
        </IonLabel>
        <IonNote
          color="medium"
          style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
        >{`Total: ${ads.totalClick},  Remaining: ${ads.remainClick}`}</IonNote>
      </div>
      <div slot="end">
        <IonBadge color="tertiary">{`+${ads.perClick} $EARN`}</IonBadge>
      </div>
    </IonItem>
  );
};

export default AdsItem;
