import { IonAvatar, IonBadge, IonCol, IonIcon, IonImg, IonItem, IonLabel, IonNote, IonRow } from '@ionic/react';
import '../assets/styles/historyItem.css';
import logo from '../assets/images/logo320.png';
import { arrowUpCircle, arrowDownCircle } from 'ionicons/icons';
import { useTelegramUser } from '../hooks';
import { useEffect, useState } from 'react';

const HistoryItem: React.FC<any> = ({ history }) => {
  const [isUp, setIsUp] = useState(true);

  useEffect(() => {
    if (history) {
      if (
        history.type === 'deposit' ||
        history.type === 'join' ||
        history.type === 'referral' ||
        history.type === 'init'
      )
        setIsUp(true);
      else setIsUp(false);
    }
  }, [history]);

  return (
    <IonItem routerLink={`/advs/credits/${history._id}`} className="hisotry-item" lines="none" detail>
      <IonAvatar aria-hidden="true" slot="start" className="hisotry-item-logo">
        <IonImg alt="Token Logo" src={logo} className="hisotry-item-token" />
        <IonIcon
          icon={isUp ? arrowUpCircle : arrowDownCircle}
          color={isUp ? 'success' : 'danger'}
          className="hisotry-item-chain"
        />
      </IonAvatar>
      <div
        className="ion-justify-content-between ion-align-items-center"
        style={{ display: 'flex', width: '100%', marginTop: '0.25rem' }}
      >
        <div style={{ maxWidth: '70%' }}>
          <IonLabel
            className="hisotry-item-label"
            style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
          >
            {history.type === 'deposit' &&
              `Deposit ${Math.round((history.amount / history.extra.rate) * 10000) / 10000} USDT`}
            {history.type === 'ads' && history.extra?.tgName && `Advertise @${history.extra?.tgName}`}
          </IonLabel>
          <IonNote color="medium">{`${new Date(history.createdAt).toLocaleString()}`}</IonNote>
        </div>
        <div className="ion-text-end">
          <IonBadge color="tertiary">{`${history.type}`}</IonBadge>
          <div
            style={{
              fontSize: '0.75rem',
              color: `${isUp ? 'var(--ion-color-success)' : 'var(--ion-color-danger)'}`,
            }}
          >{`${isUp ? '+' : '-'}${new Intl.NumberFormat().format(history.amount)}`}</div>
        </div>
      </div>
    </IonItem>
  );
};

export default HistoryItem;
