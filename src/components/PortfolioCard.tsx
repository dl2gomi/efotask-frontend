import React from 'react';
import { IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonSkeletonText, IonText } from '@ionic/react';
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
  loading?: boolean;
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
  loading = false,
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
                {loading && (
                  <IonSkeletonText
                    animated={true}
                    style={{ width: '40%', fontSize: '2rem', lineHeight: '1.5rem', marginTop: 0, marginBottom: 0 }}
                  />
                )}
                {!loading && (
                  <div style={{ fontSize: '2rem', lineHeight: '1.5rem' }}>
                    {new Intl.NumberFormat().format(amount!)}
                  </div>
                )}
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow style={{ marginTop: '0.5rem' }}>
            <IonCol>
              <IonText style={{ color: '#bbb' }}>
                <div style={{ fontSize: '0.7rem', lineHeight: '0.5rem', padding: '0.4rem 0' }}>{subCategory1}</div>
              </IonText>
              <IonText>
                {loading && (
                  <IonSkeletonText
                    animated={true}
                    style={{ width: '40%', fontSize: '1.5rem', lineHeight: '1.5rem', marginTop: 0, marginBottom: 0 }}
                  />
                )}
                {!loading && (
                  <div style={{ fontSize: '1.5rem', lineHeight: '1.5rem' }}>
                    {new Intl.NumberFormat().format(subAmount1!)}
                  </div>
                )}
              </IonText>
            </IonCol>
            <IonCol>
              <IonText style={{ color: '#bbb' }}>
                <div style={{ fontSize: '0.7rem', lineHeight: '0.5rem', padding: '0.4rem 0' }}>{subCategory2}</div>
              </IonText>
              <IonText>
                {loading && (
                  <IonSkeletonText
                    animated={true}
                    style={{ width: '40%', fontSize: '1.5rem', lineHeight: '1.5rem', marginTop: 0, marginBottom: 0 }}
                  />
                )}
                {!loading && (
                  <div style={{ fontSize: '1.5rem', lineHeight: '1.5rem' }}>
                    {new Intl.NumberFormat().format(subAmount2!)}
                  </div>
                )}
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default PortfolioCard;
