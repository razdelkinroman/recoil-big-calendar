export interface DayEvent {
  day: Date;
  events: Event[];
}

export interface MonthEvent {
  month: number;
  monthEvents: DayEvent[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}
