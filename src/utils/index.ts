import groupBy from "lodash.groupby";
import { Event, MonthEvent } from "models";
import { MONTHS, WEEKDAYS } from "const";

const getDayName = (date: Date, locale = "ru-RU") => {
  return date.toLocaleDateString(locale, { weekday: "long" });
};

const getMonthName = (index: number) => MONTHS[index];

const getWeekdays = WEEKDAYS;

// Получает список недель для построения компонента Calendar
const getDaysInWeeksInMonth = (year: number, month: number) => {
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = new Date(year, month, 1);
  let startIndex = WEEKDAYS.findIndex(
    (day) => day === getDayName(firstDayOfMonth)
  );

  let dayCount = 1;
  const weeksInMonth = [];

  while (dayCount <= totalDaysInMonth) {
    const week = new Array(7).fill(null);

    for (; startIndex < 7; startIndex++) {
      week[startIndex] = dayCount;
      dayCount++;
      if (dayCount > totalDaysInMonth) break;
    }
    startIndex = 0;
    weeksInMonth.push(week);
  }

  return weeksInMonth;
};

// Нормализует список событий под структуру удобную для чтения компонентом Calendar
const normalizeData = (data: Event[]): MonthEvent[] => {
  const eventsObjByMonth = groupBy(data, (item: Event) =>
    new Date(item.startDate).getMonth()
  );

  const normalizeDays = (items: Event[], monthIndex: string) => {
    const eventsObjByDay = groupBy(items, (item: Event) =>
      new Date(item.startDate).getDate()
    );

    const eventsByDay = Object.keys(eventsObjByDay).map((item) => {
      return {
        day: new Date(
          new Date().getFullYear(),
          Number(monthIndex),
          Number(item)
        ),
        events: eventsObjByDay[item],
      };
    });

    return eventsByDay;
  };

  const eventsByMonth = Object.keys(eventsObjByMonth).map((item) => {
    return {
      month: Number(item),
      monthEvents: normalizeDays(eventsObjByMonth[item], item),
    };
  });

  return eventsByMonth;
};

// Получает список событий по номеру месяца
const getMonthEvents = (data: MonthEvent[], month: number) => {
  const item = data.find((item) => item.month === month);

  return item ? item.monthEvents : [];
};

export {
  getMonthName,
  getWeekdays,
  getDaysInWeeksInMonth,
  normalizeData,
  getMonthEvents,
};
