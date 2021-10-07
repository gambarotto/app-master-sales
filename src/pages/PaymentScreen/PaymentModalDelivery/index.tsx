/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useEffect, useMemo, useState } from 'react';
import Button from '../../../components/Button';
import {
  Container,
  ContainerButton,
  ContainerCalendar,
  ContainerModal,
  ContainerModalContent,
  TextButton,
  TitleModal,
} from './styles';
import themeGlobal from '../../../styles/global';
import { IAvailableDay } from '..';
import CustomCalendar from '../../../components/CustomCalendar';
import LoadingContent from '../../../components/LoadingContent';

interface Props {
  availableDays: IAvailableDay[] | undefined;
  handleConfirm: (data: ISelectedDay) => void;
}
export interface ISelectedDay {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}
const PaymentModalDelivery: React.FC<Props> = ({
  availableDays,
  handleConfirm,
}) => {
  const [selectedDay, setSelectedDay] = useState<ISelectedDay>(
    {} as ISelectedDay,
  );
  const [dataCalendar, setDataCalendar] = useState<any>();

  const period = useMemo(
    () => ({
      initialDate: availableDays && availableDays[0].date,
      finalDate: availableDays && availableDays[availableDays.length - 1].date,
    }),
    [availableDays],
  );
  useEffect(() => {
    const obj = availableDays?.reduce((objMarkedDates, day) => {
      const isNotHoliday =
        day.reason === 'Domingo' ||
        day.reason === 'Sábado' ||
        day.reason === 'after 08:00';
      if (!day.available) {
        objMarkedDates[day.dateString] = {
          disableTouchEvent: true,
          inactive: true,
          marked: !isNotHoliday,
          dotColor: themeGlobal.colors.orange,
          activeOpacity: 0,
        };
      }
      if (selectedDay?.dateString === day.dateString) {
        objMarkedDates[day.dateString] = {
          selected: true,
        };
      }
      return objMarkedDates;
    }, {} as { [key: string]: any });
    setDataCalendar(obj);
  }, [availableDays, selectedDay?.dateString]);

  return (
    <ContainerModal>
      <Container>
        <ContainerModalContent>
          <TitleModal>Selecione o dia da entrega</TitleModal>
          <ContainerCalendar>
            {dataCalendar ? (
              <CustomCalendar
                minDate={period.initialDate}
                maxDate={period.finalDate}
                markedDates={dataCalendar}
                onDayPress={(day) => setSelectedDay(day)}
                disableAllTouchEventsForDisabledDays
                hideExtraDays
                disabledDaysIndexes={[0, 6]}
                showLabel
                labels={[
                  { color: themeGlobal.colors.orange, label: 'Feriados' },
                ]}
              />
            ) : (
              <LoadingContent textLoading="Carregando calendario..." />
            )}
          </ContainerCalendar>
          <ContainerButton onPress={() => handleConfirm(selectedDay)}>
            <TextButton>Confirmar</TextButton>
          </ContainerButton>
        </ContainerModalContent>
      </Container>
    </ContainerModal>
  );
};

export default PaymentModalDelivery;
