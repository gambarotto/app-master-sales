import React from 'react';
import { Calendar } from 'react-native-calendars';
import Button from '../../../components/Button';
import {
  Container,
  ContainerButton,
  ContainerCalendar,
  ContainerModal,
  ContainerModalContent,
  TitleModal,
} from './styles';
import themeGlobal from '../../../styles/global';

const PaymentModalDelivery: React.FC = () => {
  console.log('oi');
  return (
    <ContainerModal>
      <Container>
        <ContainerModalContent>
          <TitleModal>Selecione o dia da entrega</TitleModal>
          <ContainerCalendar>
            <Calendar
              disableAllTouchEventsForDisabledDays
              minDate="2021-10-06"
              maxDate="2021-10-20"
              markingType="custom"
              markedDates={{
                '2021-10-12': {
                  customStyles: {
                    container: {
                      backgroundColor: themeGlobal.colors.secondary,
                    },
                  },
                  selected: false,
                  disableTouchEvent: true,
                  inactive: true,
                  color: '#ff9000',
                  activeOpacity: 0,
                },
              }}
            />
          </ContainerCalendar>
          <ContainerButton>
            <Button textSize={14} color="secondary">
              Confirmar
            </Button>
          </ContainerButton>
        </ContainerModalContent>
      </Container>
    </ContainerModal>
  );
};

export default PaymentModalDelivery;
