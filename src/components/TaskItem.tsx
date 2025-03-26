import { IonAvatar, IonImg, IonItem, IonLabel, IonNote } from '@ionic/react';

const TaskItem: React.FC<any> = ({ type, name, id, note, img }) => {
  return (
    <IonItem href={`https://t.me/${id}`} target="_blank">
      <IonAvatar aria-hidden="true" slot="start">
        <IonImg alt="" src={img} />
      </IonAvatar>
      <div>
        <IonLabel>{name}</IonLabel>
        <IonNote color="medium">{note}</IonNote>
      </div>
    </IonItem>
  );
};

export default TaskItem;
