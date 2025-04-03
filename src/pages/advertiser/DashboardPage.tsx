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
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useTelegramUser } from '../../hooks';
import '../../assets/styles/dashboardPage.css';
import { withRole } from '../../helpers';

const DashboardPage: React.FC<{ userInfo?: any }> = ({ userInfo }) => {
  const user = useTelegramUser();

  return (
    <IonPage>
      <IonContent fullscreen>
        {!user && (
          <IonGrid>
            <div
              className="ion-align-items-center ion-justify-content-center"
              style={{ display: 'flex', padding: '1rem 0 0.25rem', zIndex: 5 }}
            >
              <div style={{ padding: '0 1rem' }}>
                <IonAvatar slot="start">
                  <IonSkeletonText animated={true}></IonSkeletonText>
                </IonAvatar>
              </div>
              <div style={{ width: '50%' }}>
                <IonLabel>
                  <h3>
                    <IonSkeletonText animated={true} style={{ width: '80%', height: '1.25rem' }}></IonSkeletonText>
                  </h3>
                  <p>
                    <IonSkeletonText animated={true} style={{ width: '60%', height: '1.25rem' }}></IonSkeletonText>
                  </p>
                </IonLabel>
              </div>
            </div>
          </IonGrid>
        )}
        {user && (
          <>
            <IonGrid>
              <div
                className="ion-align-items-center ion-justify-content-center"
                style={{ display: 'flex', padding: '1rem 0 0.25rem', zIndex: 5 }}
              >
                <div style={{ padding: '0 1rem' }}>
                  <IonAvatar aria-hidden="true" style={{ height: '6rem', width: '6rem' }}>
                    <IonImg
                      alt=""
                      src={
                        user?.user?.photo_url ??
                        `https://ui-avatars.com/api/?name=${
                          user?.user?.first_name + '+' + user?.user?.last_name
                        }&background=random&bold=true`
                      }
                    />
                  </IonAvatar>
                </div>
                <div>
                  <div
                    style={{
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      fontSize: '1.25rem',
                      paddingBottom: '0.4rem',
                      marginLeft: '0.25rem',
                    }}
                  >
                    {user?.user?.first_name} {user?.user?.last_name}
                  </div>
                  <IonText
                    color="medium"
                    style={{
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      marginLeft: '0.25rem',
                    }}
                  >{`@${user?.user?.username}`}</IonText>
                  <div style={{ marginTop: '0.4rem' }}>
                    <IonChip color={userInfo?.role === 'advertiser' ? 'success' : 'warning'}>{userInfo?.role}</IonChip>
                  </div>
                </div>
              </div>
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default withRole(DashboardPage, 'advertiser');
