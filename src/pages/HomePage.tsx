import {
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
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import slider1 from '../assets/images/slider1.jpg';
import slider2 from '../assets/images/slider2.jpg';
import slider3 from '../assets/images/slider3.jpg';
import slider4 from '../assets/images/slider4.jpg';
import { HeaderMenu } from '../components';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

import '../assets/styles/homePage.css';

interface SwiperCSSProperties extends React.CSSProperties {
  '--swiper-navigation-color'?: string;
  '--swiper-pagination-color'?: string;
}

const HomePage: React.FC = () => {
  const swiperStyle: SwiperCSSProperties = {
    '--swiper-navigation-color': '#fff8',
    '--swiper-pagination-color': '#fff8',
  };

  return (
    <IonPage>
      <IonHeader className="tab-header">
        <IonToolbar style={{ background: 'transparent' }}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Swiper
          style={swiperStyle}
          spaceBetween={0}
          slidesPerView={1}
          slidesPerGroup={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          <SwiperSlide>
            <IonImg src={slider1} alt="Slider1" />
          </SwiperSlide>
          <SwiperSlide>
            <IonImg src={slider2} alt="Slider2" />
          </SwiperSlide>
          <SwiperSlide>
            <IonImg src={slider3} alt="Slider3" />
          </SwiperSlide>
          <SwiperSlide>
            <IonImg src={slider4} alt="Slider4" />
          </SwiperSlide>
        </Swiper>
        <IonGrid>
          {/* <IonRow style={{ marginTop: '1rem' }}>
            <IonCol>
              <IonCard className="ion-card-task">
                <IonCardHeader>
                  <IonCardTitle>Total Rewards</IonCardTitle>
                  <IonCardSubtitle></IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="ion-text-end text-white" style={{ fontSize: '2rem' }}>
                  1,200,000
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="ion-card-task">
                <IonCardHeader>
                  <IonCardTitle>Completed Tasks</IonCardTitle>
                  <IonCardSubtitle></IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="ion-text-end text-white" style={{ fontSize: '2rem' }}>
                  218
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard className="ion-card-task">
                <IonCardHeader>
                  <IonCardTitle>Available Tasks</IonCardTitle>
                  <IonCardSubtitle></IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="ion-text-end text-white" style={{ fontSize: '2rem' }}>
                  455
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                <h1 className="ion-text-center">
                  You were invited by <a href="https://t.me/dl4gomi">Denis</a>.
                </h1>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="ion-card-task">
                <IonCardHeader>
                  <IonCardTitle>You referred</IonCardTitle>
                  <IonCardSubtitle></IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="ion-text-end text-white" style={{ fontSize: '2rem' }}>
                  15
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow> */}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
