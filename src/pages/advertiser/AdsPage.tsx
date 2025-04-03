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
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonNavLink,
  IonNote,
  IonPage,
  IonRouterLink,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonSelect,
  IonSelectOption,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import { PortfolioCard, TaskItem } from '../../components';
import {
  card,
  logoStackoverflow,
  wallet,
  close as closeIcon,
  add,
  checkmark,
  checkmarkCircle,
  closeCircle,
  addCircle,
} from 'ionicons/icons';
import { useApiRequest, useTelegramUser } from '../../hooks';
import { useEffect, useState } from 'react';
import { adsAddUrl, adsListUrl, channelConfirmUrl, creditsInfoUrl, taskListUrl } from '../../consts/paths';

import { SpinnerCircular } from 'spinners-react';
import AdsItem from '../../components/AdsItem';
import headerImg from '../../assets/images/balance-header.jpg';
import notaskImg from '../../assets/images/no-task.svg';
import '../../assets/styles/balancePage.css';
import { withRole } from '../../helpers';

interface Task {
  id: string;
  tgname: string;
  perClick: number;
  totalClick: number;
  remainClick: number;
  isActive: boolean;
  channelName: string;
  avatarUrl: string;
  createdAt: any;
  updatedAt: any;
}

const AdsPage: React.FC = () => {
  const user = useTelegramUser();
  const [toast] = useIonToast();

  const [isOpen, setIsOpen] = useState(false);
  const [creditInfo, setCreditInfo] = useState({
    current: 0,
    deposited: 0,
    used: 0,
  });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [newChannel, setNewChannel] = useState('');
  const [per, setPer] = useState<number>(0);
  const [join, setJoin] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>([]);

  const {
    response: confirmResponse,
    error: errorResponse,
    loading: confirmLoading,
    sendRequest: sendConfirmRequest,
  } = useApiRequest({
    endpoint: channelConfirmUrl,
    method: 'POST',
    data: {
      channel: newChannel,
    },
  });

  const {
    response: addResponse,
    error: addError,
    loading: addLoading,
    sendRequest: sendAddRequest,
  } = useApiRequest({
    endpoint: adsAddUrl,
    method: 'POST',
    headers: {
      'X-Telegram-Id': user?.user?.id,
    },
    data: {
      channel: newChannel,
      per,
      join,
    },
  });

  const {
    response: infoResponse,
    error: infoError,
    loading: infoLoading,
    sendRequest: sendInfoRequest,
  } = useApiRequest({
    endpoint: creditsInfoUrl,
    method: 'GET',
    headers: {
      'X-Telegram-Id': user?.user?.id,
    },
  });

  const {
    response: listResponse,
    error: listError,
    loading: listLoading,
    sendRequest: sendListRequest,
  } = useApiRequest({
    endpoint: adsListUrl,
    method: 'GET',
    headers: {
      'X-Telegram-Id': user?.user?.id,
    },
  });

  useEffect(() => {
    user && sendListRequest();
    user && sendInfoRequest();
  }, [user]);

  useEffect(() => {
    if (confirmResponse) {
      setIsConfirmed(confirmResponse.data.confirm);
      toast({ message: confirmResponse.message, duration: 2000, color: 'success', icon: checkmarkCircle });
    }
  }, [confirmResponse]);

  useEffect(() => {
    if (infoResponse) {
      setCreditInfo(infoResponse.data);
    }
  }, [infoResponse]);

  useEffect(() => {
    if (infoError) {
      toast({ message: infoError.message, color: 'danger', icon: closeCircle, duration: 3000 });
    }
  }, [infoError]);

  useEffect(() => {
    if (listResponse) {
      setTasks(listResponse.data.tasks);
    }
  }, [listResponse]);

  useEffect(() => {
    if (listError) {
      toast({ message: listError.message, color: 'danger', icon: closeCircle, duration: 3000 });
    }
  }, [listError]);

  useEffect(() => {
    if (addResponse) {
      toast({ message: addResponse.message, color: 'success', icon: checkmarkCircle, duration: 3000 });
      setNewChannel('');
      setPer(0);
      setJoin(0);
      setIsOpen(false);
      sendListRequest();
      setIsConfirmed(false);
    }
  }, [addResponse]);

  useEffect(() => {
    if (addError) {
      toast({ message: addError.message, color: 'danger', icon: closeCircle, duration: 3000 });
    }
  }, [addError]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg src={headerImg} alt="Header Image" style={{ height: '10rem', objectFit: 'cover' }} />
        <IonGrid style={{ marginTop: '-10rem' }}>
          <IonRow>
            <IonCol>
              <PortfolioCard
                title="ADVERTISEMENTS"
                category="total count"
                amount={tasks.length}
                subCategory1="active"
                subAmount1={tasks.filter((ele) => ele.isActive && ele.remainClick > 0).length}
                subCategory2="pending"
                subAmount2={tasks.filter((ele) => !ele.isActive).length}
                style={{
                  background: 'linear-gradient(90deg,rgba(126, 11, 192, 0.7) 0%, rgba(11, 101, 219, 0.7) 100%)',
                }}
                loading={listLoading}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonSegment value="first">
          <IonSegmentButton value="first" contentId="activeTasks">
            <IonLabel>Active</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="second" contentId="completedTasks">
            <IonLabel>Completed</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="third" contentId="pendingTasks">
            <IonLabel>Pending</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonSegmentView style={{ height: 'auto' }}>
          <IonSegmentContent id="activeTasks">
            <IonGrid style={{ padding: 0 }}>
              {listLoading && (
                <>
                  <IonRow className="ion-text-center" style={{ paddingTop: '4rem' }}>
                    <IonCol>
                      <SpinnerCircular size={50} color="#8f52ff" className="ion-margin-end" />
                    </IonCol>
                  </IonRow>
                  <IonRow className="ion-text-center">
                    <IonCol>
                      <IonText color="medium">Loading...</IonText>
                    </IonCol>
                  </IonRow>
                </>
              )}
              {!listLoading && tasks && tasks.filter((ele) => ele.isActive && ele.remainClick > 0).length > 0 && (
                <IonList style={{ padding: 0 }}>
                  {tasks
                    .filter((ele) => ele.isActive && ele.remainClick > 0)
                    .map((task) => (
                      <AdsItem key={task.id} ads={task} />
                    ))}
                </IonList>
              )}
              {!listLoading && (!tasks || tasks.filter((ele) => ele.isActive && ele.remainClick > 0).length === 0) && (
                <>
                  <IonRow style={{ paddingTop: '4rem' }}>
                    <IonCol style={{ height: '8rem', textAlign: 'center' }}>
                      <img src={notaskImg} alt="no tasks" style={{ objectFit: 'cover', height: '6rem' }} />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol style={{ textAlign: 'center' }}>
                      <IonText color="medium">You don't have active Ads. </IonText>
                    </IonCol>
                  </IonRow>
                </>
              )}
            </IonGrid>
          </IonSegmentContent>
          <IonSegmentContent id="completedTasks">
            <IonGrid style={{ padding: 0 }}>
              {listLoading && (
                <>
                  <IonRow className="ion-text-center" style={{ paddingTop: '4rem' }}>
                    <IonCol>
                      <SpinnerCircular size={50} color="#8f52ff" className="ion-margin-end" />
                    </IonCol>
                  </IonRow>
                  <IonRow className="ion-text-center">
                    <IonCol>
                      <IonText color="medium">Loading...</IonText>
                    </IonCol>
                  </IonRow>
                </>
              )}
              {!listLoading && tasks && tasks.filter((ele) => ele.isActive && ele.remainClick === 0).length > 0 && (
                <IonList style={{ padding: 0 }}>
                  {tasks
                    .filter((ele) => ele.isActive && ele.remainClick === 0)
                    .map((task) => (
                      <AdsItem key={task.id} ads={task} />
                    ))}
                </IonList>
              )}
              {!listLoading &&
                (!tasks || tasks.filter((ele) => ele.isActive && ele.remainClick === 0).length === 0) && (
                  <>
                    <IonRow style={{ paddingTop: '4rem' }}>
                      <IonCol style={{ height: '8rem', textAlign: 'center' }}>
                        <img src={notaskImg} alt="no tasks" style={{ objectFit: 'cover', height: '6rem' }} />
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol style={{ textAlign: 'center' }}>
                        <IonText color="medium">You don't have completed Ads. </IonText>
                      </IonCol>
                    </IonRow>
                  </>
                )}
            </IonGrid>
          </IonSegmentContent>
          <IonSegmentContent id="pendingTasks">
            <IonGrid style={{ padding: 0 }}>
              {listLoading && (
                <>
                  <IonRow className="ion-text-center" style={{ paddingTop: '4rem' }}>
                    <IonCol>
                      <SpinnerCircular size={50} color="#8f52ff" className="ion-margin-end" />
                    </IonCol>
                  </IonRow>
                  <IonRow className="ion-text-center">
                    <IonCol>
                      <IonText color="medium">Loading...</IonText>
                    </IonCol>
                  </IonRow>
                </>
              )}
              {!listLoading && tasks && tasks.filter((ele) => !ele.isActive).length > 0 && (
                <IonList style={{ padding: 0 }}>
                  {tasks
                    .filter((ele) => !ele.isActive)
                    .map((task) => (
                      <AdsItem key={task.id} ads={task} />
                    ))}
                </IonList>
              )}
              {!listLoading && (!tasks || tasks.filter((ele) => !ele.isActive).length === 0) && (
                <>
                  <IonRow style={{ paddingTop: '4rem' }}>
                    <IonCol style={{ height: '8rem', textAlign: 'center' }}>
                      <img src={notaskImg} alt="no tasks" style={{ objectFit: 'cover', height: '6rem' }} />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol style={{ textAlign: 'center' }}>
                      <IonText color="medium">You don't have pending Ads. </IonText>
                    </IonCol>
                  </IonRow>
                </>
              )}
            </IonGrid>
          </IonSegmentContent>
        </IonSegmentView>
        <IonFab slot="fixed" vertical="bottom" horizontal="end" style={{ right: '1rem' }}>
          <IonFabButton onClick={() => setIsOpen(true)}>
            <IonIcon icon={add} style={{ color: '#fff' }} />
          </IonFabButton>
        </IonFab>
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>New Advertisement</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>
                  <IonIcon icon={closeIcon}></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent
            style={{
              backgroundImage: 'url(assets/images/back-login.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              '--background': 'transparent',
            }}
          >
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle style={{ fontSize: '1rem', fontWeight: 'bold' }}>1. Select a channel</IonCardTitle>
                      <IonCardSubtitle>Select a telegram channel you want to advertise</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonRow>
                        <IonCol>
                          <IonInput
                            placeholder="Enter the channel name"
                            fill="solid"
                            value={newChannel}
                            onIonInput={(e) => {
                              setNewChannel(e.target.value as string);
                              setIsConfirmed(false);
                            }}
                            style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem', minHeight: '3rem' }}
                          >
                            <IonIcon
                              slot="end"
                              icon={checkmark}
                              color="success"
                              style={{ display: isConfirmed ? 'block' : 'none' }}
                            ></IonIcon>
                          </IonInput>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <IonButton
                            style={{ color: 'white' }}
                            expand="block"
                            disabled={confirmLoading || !newChannel || isConfirmed}
                            onClick={() => sendConfirmRequest()}
                          >
                            {confirmLoading && (
                              <>
                                <SpinnerCircular size={18} color="#fff" className="ion-margin-end" />
                                Checking channel...
                              </>
                            )}
                            {!confirmLoading && (
                              <>
                                <IonIcon icon={checkmarkCircle} className="ion-padding-end" />
                                Check channel name
                              </>
                            )}
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        2. Set up the advertisement
                      </IonCardTitle>
                      <IonCardSubtitle>Set the total joins and credit per join.</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonRow>
                        <IonCol>
                          <IonInput
                            labelPlacement="floating"
                            label="Total join"
                            placeholder="Enter the total join"
                            fill="solid"
                            value={join}
                            onIonInput={(e) => {
                              setJoin(parseFloat(e.target.value as string) || 0);
                            }}
                            style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem', minHeight: '3rem' }}
                          ></IonInput>
                        </IonCol>
                        <IonCol>
                          <IonInput
                            labelPlacement="floating"
                            label="Credit per join"
                            placeholder="Enter the credit per join"
                            fill="solid"
                            value={per}
                            onIonInput={(e) => {
                              setPer(parseFloat(e.target.value as string) || 0);
                            }}
                            style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem', minHeight: '3rem' }}
                          ></IonInput>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol className="ion-align-itmes-center ion-justify-content-end" style={{ display: 'flex' }}>
                          <div style={{ alignSelf: 'center' }} className="ion-margin-end">
                            Current credits: {Math.round(creditInfo.current * 10000) / 10000}
                          </div>
                          <IonRouterLink routerLink="/advs/credits" onClick={() => setIsOpen(false)}>
                            Want to top up?
                          </IonRouterLink>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <IonButton
                            style={{ color: 'white' }}
                            expand="block"
                            disabled={addLoading || !newChannel || !isConfirmed || !per || !join}
                            onClick={() => sendAddRequest()}
                          >
                            {addLoading && (
                              <>
                                <SpinnerCircular size={18} color="#fff" className="ion-margin-end" />
                                Adding an ads...
                              </>
                            )}
                            {!addLoading && (
                              <>
                                <IonIcon icon={addCircle} className="ion-padding-end" />
                                Add an ads
                              </>
                            )}
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default withRole(AdsPage, 'advertiser');
