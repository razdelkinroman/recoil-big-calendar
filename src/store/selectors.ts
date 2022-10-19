import { selector } from "recoil";
import { eventsAtom } from "./atoms";
import { normalizeData, getMonthEvents } from "utils";
import { MonthEvent, DayEvent } from "../models";

export const eventsByMonth = selector<MonthEvent[]>({
  key: "eventsByMonth",
  get: ({ get }) => {
    const tasks = get(eventsAtom);
    return normalizeData(tasks);
  },
});

export const monthEvents = (monthIndex: number) =>
  selector<DayEvent[]>({
    key: "monthEvents",
    get: ({ get }) => {
      const tasks = get(eventsAtom);
      const state = normalizeData(tasks);

      return getMonthEvents(state, monthIndex);
    },
  });
