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
import headerImg from '../assets/images/staking-header.jpg';
import { PortfolioCard, StakeItem, PlanItem } from '../components';
import { add, checkmarkCircle, logoStackoverflow, wallet } from 'ionicons/icons';
import { useState } from 'react';

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

const StakePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [planId, setPlanId] = useState(0);

  return (
    <IonPage>
      <IonHeader className="tab-header">
        <IonToolbar style={{ background: 'transparent', display: 'flex', justifyContent: 'center' }}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonImg src={headerImg} alt="Header Image" style={{ height: '10rem', objectFit: 'cover' }} />
        <IonGrid style={{ marginTop: '-6rem' }}>
          <IonRow>
            <IonCol>
              <PortfolioCard
                title="STAKING"
                category="total staked"
                amount={2000}
                subCategory1="withdrawable"
                subAmount1={1540}
                subCategory2="profit"
                subAmount2={120}
                style={{ background: 'linear-gradient(90deg,rgb(13, 121, 88) 0%,rgb(5, 128, 15) 100%)' }}
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
              <IonTitle>Open a new staking</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
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
                      <IonCardTitle style={{ fontSize: '1rem', fontWeight: 'bold' }}>1. Select Crypto</IonCardTitle>
                      <IonCardSubtitle>Select a crypto token to stake</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent className="ion-text-center">
                      <IonRow>
                        <IonCol size="4">
                          <IonSelect aria-label="Token" interface="action-sheet" placeholder="Select Token">
                            <IonSelectOption value="ERC20">USDT ERC20</IonSelectOption>
                            <IonSelectOption value="TRC20">USDT TRC20</IonSelectOption>
                            <IonSelectOption value="BEP20">USDT BEP20</IonSelectOption>
                          </IonSelect>
                        </IonCol>
                        <IonCol
                          size="8"
                          className="ion-align-itmes-center ion-justify-content-end"
                          style={{ display: 'flex' }}
                        >
                          <div style={{ alignSelf: 'center' }}>Your balance: 100</div>
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
                      <IonCardTitle style={{ fontSize: '1rem', fontWeight: 'bold' }}>2. Select Plan</IonCardTitle>
                      <IonCardSubtitle>
                        You can choose one of the staking plans below. Once staked, you cannot withdraw the staked funds
                        until the staking period ends. One staking can be done for only one token.
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {stakingPlans &&
                        stakingPlans.map((plan) => (
                          <PlanItem
                            key={plan.id}
                            plan={plan}
                            selected={planId === plan.id}
                            onClick={() => setPlanId(plan.id)}
                          />
                        ))}
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        3. Create a new staking
                      </IonCardTitle>
                      <IonCardSubtitle>Enter amount of staking</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonRow>
                        <IonCol>
                          <IonInput
                            placeholder="Enter the amount you want to deposit"
                            fill="solid"
                            style={{ '--padding-start': '0', '--padding-end': '0', 'min-height': '3rem' }}
                          ></IonInput>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <IonButton style={{ color: 'white' }} expand="block">
                            <IonIcon icon={checkmarkCircle} className="ion-padding-end" />
                            Stake
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

export default StakePage;
