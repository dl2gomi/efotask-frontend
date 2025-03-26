import React from 'react';
import { IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonText } from '@ionic/react';
import '../assets/styles/PortfolioCard.css'; // Import custom styles

interface PortfolioCardProps {
  title: string;
  category?: string;
  amount?: number;
  subCategory1?: string;
  subAmount1?: number;
  subCategory2?: string;
  subAmount2?: number;
  style?: React.CSSProperties;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  category,
  amount,
  subCategory1,
  subAmount1,
  subCategory2,
  subAmount2,
  style,
}) => {
  return (
    <IonCard className="portfolio-card" style={{ ...style }}>
      <IonCardContent>
        <div className="background-shapes"></div>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonText color="light">
                <h1 style={{ fontWeight: 'bold' }}>{title}</h1>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText style={{ color: '#bbb' }}>
                <div style={{ fontSize: '0.7rem', lineHeight: '0.5rem' }}>{category}</div>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText color="light">
                <div style={{ fontSize: '2rem', lineHeight: '1.5rem' }}>{amount}</div>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow style={{ marginTop: '0.5rem' }}>
            <IonCol>
              <IonText style={{ color: '#bbb' }}>
                <div style={{ fontSize: '0.7rem', lineHeight: '0.5rem' }}>{subCategory1}</div>
              </IonText>
              <IonText>
                <div style={{ fontSize: '1.5rem' }}>{subAmount1}</div>
              </IonText>
            </IonCol>
            <IonCol>
              <IonText style={{ color: '#bbb' }}>
                <div style={{ fontSize: '0.7rem', lineHeight: '0.5rem' }} color="medium">
                  {subCategory2}
                </div>
              </IonText>
              <IonText>
                <div style={{ fontSize: '1.5rem' }}>{subAmount2}</div>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default PortfolioCard;
