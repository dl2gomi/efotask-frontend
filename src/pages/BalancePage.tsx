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
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonNote,
  IonPage,
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
} from '@ionic/react';
import { PortfolioCard, TaskItem } from '../components';
import { card, logoStackoverflow, wallet } from 'ionicons/icons';
import headerImg from '../assets/images/balance-header.jpg';
import '../assets/styles/balancePage.css';

const BalancePage: React.FC = () => {
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
                title="BALANCE"
                category="total amount"
                amount={2000}
                subCategory1="staked"
                subAmount1={1540}
                subCategory2="withdrawable"
                subAmount2={120}
                style={{ background: 'linear-gradient(90deg,rgb(126, 11, 192) 0%,rgb(11, 101, 219) 100%)' }}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonSegment value="first">
          <IonSegmentButton value="first" contentId="deposit">
            <IonLabel>Deposit</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="second" contentId="withdraw">
            <IonLabel>Withdraw</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonSegmentView style={{ height: 'auto' }}>
          <IonSegmentContent id="deposit">
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
                          <IonButton style={{ color: 'white' }} expand="block">
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
                      <IonCardTitle style={{ fontSize: '1rem', fontWeight: 'bold' }}>2. Deposit Funds</IonCardTitle>
                      <IonCardSubtitle>Select token and deposit funds for staking</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonRow>
                        <IonCol size="4">
                          <IonSelect aria-label="Token" interface="action-sheet" placeholder="Select Token">
                            <IonSelectOption value="ERC20">USDT ERC20</IonSelectOption>
                            <IonSelectOption value="TRC20">USDT TRC20</IonSelectOption>
                            <IonSelectOption value="BEP20">USDT BEP20</IonSelectOption>
                          </IonSelect>
                        </IonCol>
                        <IonCol size="8">
                          <IonInput placeholder="Enter the amount you want to deposit"></IonInput>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <IonButton style={{ color: 'white' }} expand="block">
                            <IonIcon icon={logoStackoverflow} className="ion-padding-end" />
                            Deposit
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSegmentContent>
          <IonSegmentContent id="withdraw">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle style={{ fontSize: '1rem', fontWeight: 'bold' }}>1. Connect Wallet</IonCardTitle>
                      <IonCardSubtitle>Connect a wallet first to withdraw funds</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent className="ion-text-center">
                      <IonRow>
                        <IonCol>
                          <IonButton style={{ color: 'white' }} expand="block">
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
                      <IonCardTitle style={{ fontSize: '1rem', fontWeight: 'bold' }}>2. Withdraw Funds</IonCardTitle>
                      <IonCardSubtitle>Select token you want to withdraw funds with</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonRow>
                        <IonCol size="4">
                          <IonSelect aria-label="Token" interface="action-sheet" placeholder="Select Token">
                            <IonSelectOption value="ERC20">USDT ERC20</IonSelectOption>
                            <IonSelectOption value="TRC20">USDT TRC20</IonSelectOption>
                            <IonSelectOption value="BEP20">USDT BEP20</IonSelectOption>
                          </IonSelect>
                        </IonCol>
                        <IonCol size="8">
                          <IonInput placeholder="Enter the amount you want to withdraw"></IonInput>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <IonButton style={{ color: 'white' }} expand="block">
                            <IonIcon icon={card} className="ion-padding-end" />
                            Withdraw
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSegmentContent>
        </IonSegmentView>
      </IonContent>
    </IonPage>
  );
};

export default BalancePage;
