import {
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
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import { add, checkmarkCircle, logoStackoverflow, wallet, close as closeIcon, closeCircle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { withRole } from '../../helpers';
import headerImg from '../../assets/images/staking-header.jpg';
import { PortfolioCard, StakeItem, PlanItem } from '../../components';
import { useVault, useERC20, useApiRequest, useTelegramUser } from '../../hooks';
import { parseUnits } from 'ethers';
import { creditsHistoryUrl, creditsInfoUrl, depositAckUrl } from '../../consts/paths';
import { SpinnerCircular } from 'spinners-react';
import notaskImg from '../../assets/images/no-task.svg';
import HistoryItem from '../../components/HistoryItem';

const CreditPage: React.FC = () => {
  const [toast] = useIonToast();

  const [isOpen, setIsOpen] = useState(false);
  const [planId, setPlanId] = useState(0);
  const [creditInfo, setCreditInfo] = useState({
    current: 0,
    deposited: 0,
    used: 0,
  });
  const [newAmount, setNewAmount] = useState(0);
  const [newToken, setNewToken] = useState(null);
  const [history, setHistory] = useState([]);
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const user = useTelegramUser();
  const { contract: vaultContract, deposit } = useVault();
  const { approve, getBalance } = useERC20(import.meta.env.VITE_ERC20_USDT_ADDRESS);

  const {
    response: depositResponse,
    error: depositError,
    loading: depositLoading,
    sendRequest: sendDepositRequest,
  } = useApiRequest({
    endpoint: depositAckUrl,
    method: 'POST',
    headers: {
      'X-Telegram-Id': user?.user?.id,
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
    response: historyResponse,
    error: historyError,
    loading: historyLoading,
    sendRequest: sendHistoryRequest,
  } = useApiRequest({
    endpoint: creditsHistoryUrl,
    method: 'GET',
    headers: {
      'X-Telegram-Id': user?.user?.id,
    },
  });

  useEffect(() => {
    user?.user?.id && sendInfoRequest();
    user?.user?.id && sendHistoryRequest();
  }, [user]);

  useEffect(() => {
    if (depositResponse) {
      toast({ message: depositResponse.message, color: 'success', icon: checkmarkCircle, duration: 3000 });
      setNewAmount(0);
    }
  }, [depositResponse]);

  useEffect(() => {
    if (depositError) {
      toast({ message: depositError.message, color: 'danger', icon: closeCircle, duration: 3000 });
      setNewAmount(0);
    }
  }, [depositError]);

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
    if (historyResponse) {
      setHistory(historyResponse.data.history);
    }
  }, [historyResponse]);

  useEffect(() => {
    if (historyError) {
      toast({ message: historyError.message, color: 'danger', icon: closeCircle, duration: 3000 });
    }
  }, [historyError]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg src={headerImg} alt="Header Image" style={{ height: '10rem', objectFit: 'cover' }} />
        <IonGrid style={{ marginTop: '-10rem' }}>
          <IonRow>
            <IonCol>
              <PortfolioCard
                title="CREDITS"
                category="current"
                amount={creditInfo.current}
                subCategory1="total deposit"
                subAmount1={creditInfo.deposited}
                subCategory2="total used"
                subAmount2={creditInfo.used}
                style={{ background: 'linear-gradient(90deg,rgba(13, 121, 88, 0.7) 0%,rgba(5, 128, 15, 0.7) 100%)' }}
                loading={infoLoading}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-margin-vertical ion-padding-horizontal">
              <IonText color="medium">
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Credits History</div>
              </IonText>
            </IonCol>
          </IonRow>
          {/* <IonList lines="none" inset> */}
          <IonGrid>
            {history &&
              history.length > 0 &&
              history.map((hist, i) => (
                <IonRow key={i}>
                  <IonCol style={{ padding: '2px' }}>
                    <HistoryItem history={hist} />
                  </IonCol>
                </IonRow>
              ))}
            {(!history || history.length === 0) && (
              <>
                <IonRow style={{ paddingTop: '4rem' }}>
                  <IonCol style={{ height: '8rem', textAlign: 'center' }}>
                    <img src={notaskImg} alt="no tasks" style={{ objectFit: 'cover', height: '6rem' }} />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol style={{ textAlign: 'center' }}>
                    <IonText color="medium">No history yet</IonText>
                  </IonCol>
                </IonRow>
              </>
            )}
          </IonGrid>
          {/* </IonList> */}
        </IonGrid>
        <IonFab slot="fixed" vertical="bottom" horizontal="end" style={{ right: '1rem' }}>
          <IonFabButton onClick={() => setIsOpen(true)}>
            <IonIcon icon={add} style={{ color: '#fff' }} />
          </IonFabButton>
        </IonFab>
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>New Deposit</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>
                  <IonIcon icon={closeIcon}></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent
            style={{
              backgroundImage: 'url(assets/images/back-stake.png)',
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
                      <IonCardTitle style={{ fontSize: '1rem', fontWeight: 'bold' }}>1. Connect Wallet</IonCardTitle>
                      <IonCardSubtitle>Connect a wallet first to deposit funds</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent className="ion-text-center">
                      <IonRow>
                        <IonCol>
                          <IonButton style={{ color: 'white' }} expand="block" onClick={() => open()}>
                            <IonIcon icon={wallet} className="ion-padding-end" />
                            {isConnected ? `${address?.slice(0, 4)}...${address?.slice(-4)}` : 'Wallet Connect'}
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
                      <IonCardTitle style={{ fontSize: '1rem', fontWeight: 'bold' }}>2. Select Crypto</IonCardTitle>
                      <IonCardSubtitle>
                        Select a crypto token to deposit. You will receive 100 $EARN credits per one USD.
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent className="ion-text-center">
                      <IonRow>
                        <IonCol>
                          <IonSelect
                            aria-label="Token"
                            interface="action-sheet"
                            placeholder="Select Token"
                            value={newToken}
                            onIonChange={(e) => setNewToken(e.detail.value)}
                          >
                            <IonSelectOption value="ERC20">USDT ERC20</IonSelectOption>
                          </IonSelect>
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
                        3. Deposit with your wallet
                      </IonCardTitle>
                      <IonCardSubtitle>Enter the amount of deposit</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonRow>
                        <IonCol>
                          <IonInput
                            placeholder="Enter the amount you want to deposit"
                            fill="solid"
                            type="number"
                            value={newAmount}
                            onIonInput={(e) => setNewAmount(parseFloat((e.target.value ?? '').toString()))}
                            style={{ paddingLeft: '1rem', paddingRight: '1rem', minHeight: '3rem' }}
                          ></IonInput>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <IonButton
                            style={{ color: 'white' }}
                            expand="block"
                            disabled={isNaN(newAmount) || !newAmount || !newToken || !isConnected || depositLoading}
                            onClick={async () => {
                              try {
                                await approve(await vaultContract.getAddress(), newAmount.toString());
                                const receipt = await deposit(newAmount.toString());
                                await sendDepositRequest({ receipt, token: newToken, amount: newAmount });
                              } catch (error: any) {
                                toast({
                                  message:
                                    error.reason === 'rejected'
                                      ? 'You rejected the transaction'
                                      : `You don't have sufficient funds or something went wrong`,
                                  color: 'danger',
                                  icon: closeCircle,
                                  duration: 2000,
                                  animated: true,
                                });
                              }
                            }}
                          >
                            {depositLoading && (
                              <>
                                <SpinnerCircular size={18} color="#fff" className="ion-margin-end" />
                                Processing...
                              </>
                            )}
                            {!depositLoading && (
                              <>
                                <IonIcon icon={checkmarkCircle} className="ion-padding-end" />
                                Deposit
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

export default CreditPage;
