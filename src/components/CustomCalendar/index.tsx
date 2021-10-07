import React from 'react';
import { Calendar, CalendarProps, LocaleConfig } from 'react-native-calendars';
import themeGlobal from '../../styles/global';
import {
  Container,
  ContainerCalendar,
  ContainerLabel,
  ContainerLabels,
  IndicatorColor,
  TextLabel,
} from './styles';

interface Props extends CalendarProps {
  showLabel?: boolean;
  labels?: [
    {
      color: string;
      label: string;
    },
  ];
}
LocaleConfig.locales.br = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'br';

const { colors } = themeGlobal;

const theme: any = {
  'stylesheet.calendar.header': {
    dayTextAtIndex0: {
      fontFamily: 'Roboto-Bold',
    },
    dayTextAtIndex6: {
      fontFamily: 'Roboto-Bold',
    },
  },
  backgroundColor: colors.tertiary,
  calendarBackground: colors.white,
  textSectionTitleColor: colors.gray3,
  textSectionTitleDisabledColor: colors.gray4,
  selectedDayBackgroundColor: colors.tertiary,
  selectedDayTextColor: colors.white,
  todayTextColor: colors.tertiary,
  // dayTextColor: '#2d4150',
  // textDisabledColor: '#d9e1e8',
  // dotColor: '#00adf5',
  selectedDotColor: colors.secondary,
  arrowColor: colors.tertiary,
  // disabledArrowColor: '#d9e1e8',
  monthTextColor: colors.gray2,
  // indicatorColor: 'blue',
  // textDayFontFamily: 'monospace',
  // textMonthFontFamily: 'monospace',
  // textDayHeaderFontFamily: 'monospace',
  // textDayFontWeight: '300',
  // textMonthFontWeight: 'bold',
  // textDayHeaderFontWeight: '300',
  textDayFontSize: 14,
  // textMonthFontSize: 16,
  // textDayHeaderFontSize: 16,
};

//  {
//   "accessibilityLabel": " Terça-Feira 12 Outubro 2021 You have entries for this day disabled ",
//   "children": 12,
//   "date": Object {
//     "dateString": "2021-10-12",
//     "day": 12,
//     "month": 10,
//     "timestamp": 1633996800000,
//     "year": 2021,
//   },
//   "dayComponent": [Function dayComponent],
//   "disableAllTouchEventsForDisabledDays": true,
//   "marking": Object {
//     "activeOpacity": 0,
//     "disableTouchEvent": true,
//     "dotColor": "#ff9000",
//     "inactive": true,
//     "marked": true,
//   },
//   "onLongPress": [Function anonymous],
//   "onPress": [Function anonymous],
//   "state": "",
//   "testID": "native.calendar.SELECT_DATE_SLOT-2021-10-12",
//   "theme": Object {
//     "arrowColor": "#37c7e3",
//     "backgroundColor": "#37c7e3",
//     "calendarBackground": "#fff",
//     "monthTextColor": "#828282",
//     "selectedDayBackgroundColor": "#00f5",
//     "selectedDayTextColor": "#E40B0B",
//     "selectedDotColor": "#e94250",
//     "stylesheet.calendar.header": Object {
//       "dayTextAtIndex0": Object {
//         "fontFamily": "Roboto-Bold",
//       },
//       "dayTextAtIndex6": Object {
//         "fontFamily": "Roboto-Bold",
//       },
//     },
//     "textDayFontSize": 14,
//     "textSectionTitleColor": "#C9C9C9",
//     "textSectionTitleDisabledColor": "#ececec",
//     "todayTextColor": "#37c7e3",
//   },
// }
const CustomCalendar: React.FC<Props> = ({
  showLabel,
  labels = [],
  ...props
}) => (
  <Container>
    <ContainerCalendar
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 50,
          height: 20,
        },
        shadowOpacity: 0,
        shadowRadius: 3.84,

        elevation: 5,
      }}
    >
      <Calendar theme={theme} {...props} />
    </ContainerCalendar>
    {showLabel && labels.length > 0 && (
      <ContainerLabels>
        {labels.map((label, index) => (
          <ContainerLabel key={String(index)}>
            <IndicatorColor color={label.color} />
            <TextLabel>{label.label}</TextLabel>
          </ContainerLabel>
        ))}
      </ContainerLabels>
    )}
  </Container>
);

export default CustomCalendar;

/**
 *       dayComponent={({ date, state, marking, onPress }: DayComponentProps) => {
        console.log(date.day, date.day === selectedDay);

        return (
          <ContainerDayCalendar
            onPress={onPress}
            selected={date.day === selectedDay}
          >
            <TextDay
              disable={state === 'disabled' || (marking && marking.inactive)}
              selected={date.day === selectedDay}
            >
              {date.day}
            </TextDay>
          </ContainerDayCalendar>
        );
      }}
 */
