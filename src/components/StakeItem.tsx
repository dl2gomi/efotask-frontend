import { IonAvatar, IonBadge, IonCol, IonImg, IonItem, IonLabel, IonNote, IonRow } from '@ionic/react';
import '../assets/styles/stakeItem.css';

const StakeItem: React.FC<any> = ({ tokenLogo, chainLogo, stake }) => {
  return (
    <IonItem routerLink={`/tabs/stake/${stake.id}`} className="stake-item" lines="none" detail>
      <IonAvatar aria-hidden="true" slot="start" className="stake-item-logo">
        <IonImg alt="Token Logo" src={tokenLogo} className="stake-item-token" />
        <IonImg alt="Chain Logo" src={chainLogo} className="stake-item-chain" />
      </IonAvatar>
      <div
        className="ion-justify-content-between ion-align-items-center"
        style={{ display: 'flex', width: '100%', marginTop: '0.25rem' }}
      >
        <div>
          <IonLabel className="stake-item-label">{`${stake.amount}`}</IonLabel>
          <IonNote color="medium">{`${stake.started_at.toLocaleDateString()}~${stake.ended_at.toLocaleDateString()}`}</IonNote>
        </div>
        <div className="ion-text-end">
          <IonBadge color="tertiary">{`${stake.plan.name}`}</IonBadge>
          <div style={{ fontSize: '0.75rem', color: 'var(--ion-color-success)' }}>{`+${stake.plan.percent}%`}</div>
        </div>
      </div>
    </IonItem>
  );
};

export default StakeItem;
