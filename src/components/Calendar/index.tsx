import React, { useEffect, useMemo, useState } from "react";
import {
  getWeekdays,
  getMonthName,
  getDaysInWeeksInMonth,
  getMonthEvents,
} from "utils";
import { DayEvent } from "models";
import { useRecoilValue } from "recoil";
import { eventsByMonth } from "store/selectors";

const getDayEvents = (events: DayEvent[], day: number) => {
  const item = events.find((item) => new Date(item.day).getDate() === day);
  return item ? item.events : [];
};

export const Calendar = (props: CalendarProps) => {
  const { setShowPanel, setActiveDay } = props;
  const eventsFromState = useRecoilValue(eventsByMonth);

  const today = new Date();

  const initialState = {
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  };

  const isToday = (day: number) =>
    day === today.getDate() && selectedDate.month === today.getMonth();

  const [selectedDate, setDate] = useState({
    ...initialState,
  });

  const monthData = useMemo(
    () => getMonthEvents(eventsFromState, selectedDate.month),
    [selectedDate.month, eventsFromState]
  );

  const previousMonth = () => {
    setDate(({ year, month }) => ({
      year: month > 0 ? year : year - 1,
      month: month > 0 ? month - 1 : 11,
      day: month === today.getMonth() ? today.getDate() : 1,
    }));
  };

  const nextMonth = () => {
    setDate(({ year, month }) => ({
      year: month === 11 ? year + 1 : year,
      month: month === 11 ? 0 : month + 1,
      day: month === today.getMonth() ? today.getDate() : 1,
    }));
  };

  const onClickDayHandler = (day: number) => {
    setShowPanel(true);

    setDate((prevState) => {
      return {
        ...prevState,
        day,
      };
    });
  };

  useEffect(() => {
    setActiveDay(
      new Date(selectedDate.year, selectedDate.month, selectedDate.day)
    );
  }, [selectedDate.year, selectedDate.month, selectedDate.day, setActiveDay]);

  const Caption = () => {
    return (
      <caption className="p-4 border-b">
        <div className="flex gap-2 items-center">
          <div className="flex gap-2">
            <button
              className="btn btn-circle btn-sm mr-2"
              onClick={previousMonth}
            >
              <svg
                className="h-6 w-6 fill-current md:h-8 md:w-8"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
              </svg>
            </button>
            <button className="btn btn-circle btn-sm" onClick={nextMonth}>
              <svg
                className="h-6 w-6 fill-current md:h-8 md:w-8"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
              </svg>
            </button>
          </div>

          <p className="text-xl">{`${getMonthName(selectedDate.month)} ${
            selectedDate.year
          }`}</p>
        </div>
      </caption>
    );
  };

  const Head = () => {
    return (
      <thead>
        <tr>
          {getWeekdays.map((day) => {
            return (
              <th
                key={day}
                scope="col"
                role="columnheader"
                aria-label={day}
                className="text-gray-500 w-[calc(100%_/_7)] border-r"
              >
                {day}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };

  const Body = () => {
    return (
      <tbody>
        {getDaysInWeeksInMonth(selectedDate.year, selectedDate.month).map(
          (w, i) => (
            <tr key={`week_${i}`} className="border-b">
              {w.map((day, i) => {
                return (
                  <td
                    key={`day_${i}`}
                    className="border-r h-[160px]"
                    onClick={() => onClickDayHandler(day)}
                  >
                    <div
                      className={`flex flex-col w-full h-full ${
                        isToday(day)
                          ? `bg-[#1718218c] text-white`
                          : "text-gray-400"
                      } `}
                    >
                      <span className="text-gray-300 text-lg self-center">
                        {day}
                      </span>
                      {getDayEvents(monthData, day).map((event) => {
                        return day ? (
                          <div
                            className="tooltip flex text-xs pb-1 px-1 cursor-pointer"
                            data-tip={event.description}
                          >
                            <span>
                              {event.startDate.getHours()}:
                              {event.startDate.getMinutes()}
                            </span>
                            <span className="w-fit truncate ml-1">
                              {event.title}
                            </span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </td>
                );
              })}
            </tr>
          )
        )}
      </tbody>
    );
  };

  return (
    <table className="h-full w-full table-fixed" role="grid">
      <Caption />
      <Head />
      <Body />
    </table>
  );
};

interface CalendarProps {
  setShowPanel: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveDay: (day: Date) => void;
}
