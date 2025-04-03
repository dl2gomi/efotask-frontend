import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonLabel,
  IonMenuButton,
  IonNote,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonText,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import { withRole } from '../../helpers';
import { useParams } from 'react-router';
import { useApiRequest, useTelegramUser } from '../../hooks';
import { adsDetailUrl } from '../../consts/paths';
import { Key, useEffect, useState } from 'react';
import { closeCircle } from 'ionicons/icons';
import { hemi } from '@reown/appkit/networks';
import HistoryItem from '../../components/HistoryItem';
import notaskImg from '../../assets/images/no-task.svg';

const AdsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const user = useTelegramUser();
  const [toast] = useIonToast();

  const [ads, setAds] = useState<any>({});

  const {
    response: detailResponse,
    error: detailError,
    loading: detailLoading,
    sendRequest: sendDetailRequest,
  } = useApiRequest({
    endpoint: adsDetailUrl,
    method: 'GET',
    headers: {
      'X-Telegram-Id': user?.user?.id,
    },
  });

  useEffect(() => {
    user && id && sendDetailRequest({}, {}, id);
  }, [user, id]);

  useEffect(() => {
    if (detailResponse) {
      setAds(detailResponse.data);
    }
  }, [detailResponse]);

  useEffect(() => {
    if (detailError) {
      toast({ message: detailError.message, color: 'danger', icon: closeCircle, duration: 3000 });
    }
  }, [detailError]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/advs/ads" />
          </IonButtons>
          <IonLabel>Ads</IonLabel>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {detailLoading && (
          <IonGrid>
            <div
              className="ion-align-items-center ion-justify-content-center"
              style={{ display: 'flex', padding: '1rem 0 0.25rem' }}
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
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              <IonSkeletonText
                animated={true}
                style={{ width: '60px', height: '2rem', '--border-radius': '1rem' }}
              ></IonSkeletonText>
              <IonSkeletonText
                animated={true}
                style={{ width: '60px', height: '2rem', '--border-radius': '1rem' }}
              ></IonSkeletonText>
              <IonSkeletonText
                animated={true}
                style={{ width: '80px', height: '2rem', '--border-radius': '1rem' }}
              ></IonSkeletonText>
            </div>
            <div>
              <IonSkeletonText animated={true} style={{ height: '4rem' }}></IonSkeletonText>
              <IonSkeletonText animated={true} style={{ height: '4rem' }}></IonSkeletonText>
              <IonSkeletonText animated={true} style={{ height: '4rem' }}></IonSkeletonText>
              <IonSkeletonText animated={true} style={{ height: '4rem' }}></IonSkeletonText>
            </div>
          </IonGrid>
        )}
        {!detailLoading && (
          <>
            <IonGrid>
              <div
                className="ion-align-items-center ion-justify-content-center"
                style={{ display: 'flex', padding: '1rem 0 0.25rem' }}
              >
                <div style={{ padding: '0 1rem' }}>
                  <IonAvatar aria-hidden="true">
                    <IonImg alt="" src={ads.avatarUrl} />
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
                    }}
                  >
                    {ads.channelName}
                  </div>
                  <IonText
                    color="medium"
                    style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                  >{`@${ads.tgname}`}</IonText>
                </div>
              </div>
              <IonRow className="ion-text-center">
                <IonCol>
                  <IonChip color={!ads.isActive ? 'warning' : ads.remainClick === 0 ? 'danger' : 'success'}>
                    {!ads.isActive ? 'Pending' : ads.remainClick === 0 ? 'Completed' : 'Active'}
                  </IonChip>
                  <IonChip color="tertiary">{`+${ads.perClick} $EARN`}</IonChip>
                  <IonChip color="secondary">{`${ads.remainClick} / ${ads.totalClick} Remain`}</IonChip>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonText color="medium">
                    <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>Recent Ads History</div>
                  </IonText>
                </IonCol>
              </IonRow>
              {ads.adsHistory &&
                ads.adsHistory.length > 0 &&
                ads.adsHistory.map((hist: any, i: number) => (
                  <IonRow key={i}>
                    <IonCol style={{ padding: '2px' }}>
                      <HistoryItem history={hist} />
                    </IonCol>
                  </IonRow>
                ))}
              {(!ads.adsHistory || ads.adsHistory.length === 0) && (
                <>
                  <IonRow style={{ paddingTop: '4rem' }}>
                    <IonCol style={{ height: '8rem', textAlign: 'center' }}>
                      <img src={notaskImg} alt="no tasks" style={{ objectFit: 'cover', height: '6rem' }} />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol style={{ textAlign: 'center' }}>
                      <IonText color="medium">No Ads history yet</IonText>
                    </IonCol>
                  </IonRow>
                </>
              )}
            </IonGrid>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonText color="medium">
                    <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>Recent Join History</div>
                  </IonText>
                </IonCol>
              </IonRow>
              {ads.joinHistory &&
                ads.joinHistory.length > 0 &&
                ads.joinHistory.map((hist: any, i: number) => (
                  <IonRow key={i}>
                    <IonCol style={{ padding: '2px' }}>
                      <HistoryItem history={hist} />
                    </IonCol>
                  </IonRow>
                ))}
              {(!ads.joinHistory || ads.joinHistory.length === 0) && (
                <>
                  <IonRow style={{ paddingTop: '4rem' }}>
                    <IonCol style={{ height: '8rem', textAlign: 'center' }}>
                      <img src={notaskImg} alt="no tasks" style={{ objectFit: 'cover', height: '6rem' }} />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol style={{ textAlign: 'center' }}>
                      <IonText color="medium">No join history yet</IonText>
                    </IonCol>
                  </IonRow>
                </>
              )}
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default withRole(AdsDetailPage, 'advertiser');
