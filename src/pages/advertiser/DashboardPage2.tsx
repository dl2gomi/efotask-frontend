import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useTelegramUser } from '../../hooks';
import '../../assets/styles/dashboardPage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardPage: React.FC = () => {
  const user = useTelegramUser();

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Advertisements',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Advertisement Performance',
      },
    },
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {user ? (
          <IonGrid>
            <IonRow>
              {/* Left Column: User Info */}
              <IonCol size="12" sizeMd="4">
                <IonCard className="user-card">
                  <IonCardContent className="ion-text-center">
                    <IonAvatar style={{ margin: '0 auto', width: '120px', height: '120px' }}>
                      <img
                        alt="User Avatar"
                        src={
                          user?.user?.photo_url ??
                          `https://ui-avatars.com/api/?name=${
                            user?.user?.first_name + '+' + user?.user?.last_name
                          }&background=random&bold=true`
                        }
                      />
                    </IonAvatar>
                    <h2 style={{ marginTop: '1rem', fontWeight: 'bold' }}>
                      {user?.user?.first_name} {user?.user?.last_name}
                    </h2>
                    <IonText color="medium" style={{ fontSize: '1rem' }}>
                      @{user?.user?.username}
                    </IonText>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              {/* Right Column: User Details and Charts */}
              <IonCol size="12" sizeMd="8">
                <IonRow>
                  {/* User Details */}
                  <IonCol size="12" sizeMd="4">
                    <IonCard className="info-card">
                      <IonCardContent>
                        <IonLabel>
                          <h3 style={{ fontWeight: 'bold', color: '#4caf50' }}>Balance</h3>
                        </IonLabel>
                        <IonText color="primary" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                          $1,250.00
                        </IonText>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="12" sizeMd="4">
                    <IonCard className="info-card">
                      <IonCardContent>
                        <IonLabel>
                          <h3 style={{ fontWeight: 'bold', color: '#2196f3' }}>Join Date</h3>
                        </IonLabel>
                        <IonText color="medium" style={{ fontSize: '1.2rem' }}>
                          January 15, 2023
                        </IonText>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="12" sizeMd="4">
                    <IonCard className="info-card">
                      <IonCardContent>
                        <IonLabel>
                          <h3 style={{ fontWeight: 'bold', color: '#ff9800' }}>Role</h3>
                        </IonLabel>
                        <IonText color="medium" style={{ fontSize: '1.2rem' }}>
                          Advertiser
                        </IonText>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>

                {/* Charts Section */}
                <IonRow>
                  <IonCol size="12">
                    <IonCard className="chart-card">
                      <IonCardContent>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Advertisement Performance</h3>
                        <Bar data={chartData} options={chartOptions} />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        ) : (
          <IonGrid>
            <IonRow className="ion-align-items-center ion-justify-content-center" style={{ marginTop: '2rem' }}>
              <IonCol size="12" className="ion-text-center">
                <IonText color="medium" style={{ fontSize: '1.2rem' }}>
                  Loading user data...
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
