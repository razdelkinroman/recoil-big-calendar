import { atom } from "recoil";
import { Event } from "../models";

export const eventsAtom = atom({
  key: "events",
  default: [] as Event[],
});
