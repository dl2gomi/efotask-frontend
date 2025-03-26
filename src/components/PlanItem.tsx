import { IonAvatar, IonBadge, IonCol, IonImg, IonItem, IonLabel, IonNote, IonRow } from '@ionic/react';
import '../assets/styles/planItem.css';

const PlanItem: React.FC<any> = ({ plan, selected = false, onClick }) => {
  return (
    <IonItem className={`plan-item ${selected ? 'selected' : ''}`} lines="none" onClick={onClick}>
      <div
        className="ion-justify-content-between ion-align-items-center"
        style={{ display: 'flex', width: '100%', marginTop: '0.25rem' }}
      >
        <div>
          <IonLabel className="plan-item-label">{`${plan.name}`}</IonLabel>
          <IonNote color="medium">{`${plan.period} days`}</IonNote>
        </div>
        <div className="ion-text-end">
          <IonBadge color="tertiary">{`+${plan.percent}%`}</IonBadge>
          <div style={{ fontSize: '0.75rem', color: 'var(--ion-color-success)' }}>{`min: $${plan.minimum}`}</div>
        </div>
      </div>
    </IonItem>
  );
};

export default PlanItem;
