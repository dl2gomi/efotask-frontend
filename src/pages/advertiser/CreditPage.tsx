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
} from '@ionic/react';
import { add, checkmarkCircle, logoStackoverflow, wallet, close as closeIcon } from 'ionicons/icons';
import { useState } from 'react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { withRole } from '../../helpers';
import headerImg from '../../assets/images/staking-header.jpg';
import { PortfolioCard, StakeItem, PlanItem } from '../../components';

const activeStakings = [
  {
    id: 12,
    amount: '200',
    started_at: new Date(2025, 1, 28, 0, 0, 0),
    ended_at: new Date(2025, 2, 28, 0, 0, 0),
    plan: {
      name: 'PRO',
      percent: 10,
    },
    token: 'USDT',
    chain: 'erc20',
  },
  {
    id: 13,
    amount: '500',
    started_at: new Date(2025, 2, 28, 0, 0, 0),
    ended_at: new Date(2025, 3, 28, 0, 0, 0),
    plan: {
      name: 'PRO Ultra',
      percent: 20,
    },
    token: 'USDT',
    chain: 'erc20',
  },
  {
    id: 14,
    amount: '500',
    started_at: new Date(2025, 2, 28, 0, 0, 0),
    ended_at: new Date(2025, 3, 28, 0, 0, 0),
    plan: {
      name: 'PRO Ultra',
      percent: 20,
    },
    token: 'USDT',
    chain: 'erc20',
  },
  {
    id: 15,
    amount: '500',
    started_at: new Date(2025, 2, 28, 0, 0, 0),
    ended_at: new Date(2025, 3, 28, 0, 0, 0),
    plan: {
      name: 'PRO Ultra',
      percent: 20,
    },
    token: 'USDT',
    chain: 'erc20',
  },
  {
    id: 16,
    amount: '500',
    started_at: new Date(2025, 2, 28, 0, 0, 0),
    ended_at: new Date(2025, 3, 28, 0, 0, 0),
    plan: {
      name: 'PRO Ultra',
      percent: 20,
    },
    token: 'USDT',
    chain: 'erc20',
  },
  {
    id: 17,
    amount: '500',
    started_at: new Date(2025, 2, 28, 0, 0, 0),
    ended_at: new Date(2025, 3, 28, 0, 0, 0),
    plan: {
      name: 'PRO Ultra',
      percent: 20,
    },
    token: 'USDT',
    chain: 'erc20',
  },
  {
    id: 18,
    amount: '500',
    started_at: new Date(2025, 2, 28, 0, 0, 0),
    ended_at: new Date(2025, 3, 28, 0, 0, 0),
    plan: {
      name: 'PRO Ultra',
      percent: 20,
    },
    token: 'USDT',
    chain: 'erc20',
  },
  {
    id: 19,
    amount: '500',
    started_at: new Date(2025, 2, 28, 0, 0, 0),
    ended_at: new Date(2025, 3, 28, 0, 0, 0),
    plan: {
      name: 'PRO Ultra',
      percent: 20,
    },
    token: 'USDT',
    chain: 'erc20',
  },
  {
    id: 20,
    amount: '500',
    started_at: new Date(2025, 2, 28, 0, 0, 0),
    ended_at: new Date(2025, 3, 28, 0, 0, 0),
    plan: {
      name: 'PRO Ultra',
      percent: 20,
    },
    token: 'USDT',
    chain: 'erc20',
  },
  {
    id: 21,
    amount: '500',
    started_at: new Date(2025, 2, 28, 0, 0, 0),
    ended_at: new Date(2025, 3, 28, 0, 0, 0),
    plan: {
      name: 'PRO Ultra',
      percent: 20,
    },
    token: 'USDT',
    chain: 'erc20',
  },
  {
    id: 22,
    amount: '500',
    started_at: new Date(2025, 2, 28, 0, 0, 0),
    ended_at: new Date(2025, 3, 28, 0, 0, 0),
    plan: {
      name: 'PRO Ultra',
      percent: 20,
    },
    token: 'USDT',
    chain: 'erc20',
  },
  {
    id: 23,
    amount: '500',
    started_at: new Date(2025, 2, 28, 0, 0, 0),
    ended_at: new Date(2025, 3, 28, 0, 0, 0),
    plan: {
      name: 'PRO Ultra',
      percent: 20,
    },
    token: 'USDT',
    chain: 'erc20',
  },
];

const stakingPlans = [
  {
    id: 1,
    name: 'Starter',
    percent: 5,
    period: 15,
    minimum: 100,
  },
  {
    id: 2,
    name: 'Advanced',
    percent: 8,
    period: 20,
    minimum: 300,
  },
  {
    id: 3,
    name: 'PRO',
    percent: 12,
    period: 30,
    minimum: 500,
  },
  {
    id: 4,
    name: 'PRO ULTRA',
    percent: 20,
    period: 30,
    minimum: 1000,
  },
];

const CreditPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [planId, setPlanId] = useState(0);
  const [newAmount, setNewAmount] = useState(0);
  const [newToken, setNewToken] = useState(null);
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

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
                amount={2000}
                subCategory1="total deposit"
                subAmount1={1540}
                subCategory2="total used"
                subAmount2={120}
                style={{ background: 'linear-gradient(90deg,rgba(13, 121, 88, 0.7) 0%,rgba(5, 128, 15, 0.7) 100%)' }}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-margin-vertical ion-padding-horizontal">
              <IonText color="medium">
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Active Stakings</div>
              </IonText>
            </IonCol>
          </IonRow>
          {/* <IonList lines="none" inset> */}
          <IonGrid>
            {activeStakings &&
              activeStakings.map((st) => (
                <IonRow key={st.id}>
                  <IonCol>
                    <StakeItem
                      stake={st}
                      tokenLogo="https://cryptologos.cc/logos/tether-usdt-logo.png?v=040"
                      chainLogo="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040"
                    />
                  </IonCol>
                </IonRow>
              ))}
          </IonGrid>
          {/* </IonList> */}
        </IonGrid>
        <IonFab slot="fixed" vertical="bottom" horizontal="end" style={{ right: '2rem' }}>
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
                            Connect Wallet
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
                        <IonCol size="5">
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
                        <IonCol
                          size="7"
                          className="ion-align-itmes-center ion-justify-content-end"
                          style={{ display: 'flex' }}
                        >
                          <div style={{ alignSelf: 'center' }}>Current balance: 100</div>
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
                            style={{ paddingLeft: '1rem', paddingRight: '1rem', 'min-height': '3rem' }}
                          ></IonInput>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <IonButton
                            style={{ color: 'white' }}
                            expand="block"
                            disabled={isNaN(newAmount) || !newAmount || !newToken}
                          >
                            <IonIcon icon={checkmarkCircle} className="ion-padding-end" />
                            Deposit
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

export default withRole(CreditPage, 'advertiser');
