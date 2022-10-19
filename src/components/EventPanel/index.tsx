import { useRecoilValue } from "recoil";
import { eventsAtom } from "store/atoms";
import { ReactComponent as LeftDoubleArrow } from "assets/images/left-double-arrow.svg";

export const EventPanel = (props: EventPanelProps) => {
  const { setShowForm, activeDay, showPanel, setShowPanel } = props;
  const allEvents = useRecoilValue(eventsAtom);

  const dayEvents = allEvents.filter(
    (item) =>
      new Date(item.startDate).toDateString() ==
      new Date(activeDay).toDateString()
  );
  const EventsItems = () => {
    return (
      <div className={`${!showPanel ? "hidden" : "block"}`}>
        <button
          className="btn btn-primary btn-sm w-full my-4"
          onClick={() => setShowForm(true)}
        >
          Новое событие
        </button>

        {dayEvents.map((event) => (
          <div className="flex flex-col text-gray-400 border-b border-gray-300">
            <div className="flex gap-2 p-1">
              <span>
                {event.startDate.getHours()}:{event.startDate.getMinutes()}
              </span>
              <div className="flex flex-col">
                <span>{event.title}</span>
                <span>{event.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full bg-base-100 p-1 transition-all w-[460px]">
      <div className="flex flex-col h-full relative">
        <EventsItems />
        <div className="absolute top-1/2 transition-all">
          <LeftDoubleArrow
            className={`cursor-pointer ${
              showPanel ? "rotate-180 duration-700" : "rotate-0 duration-700"
            }`}
            width={24}
            height={24}
            onClick={() => setShowPanel((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
};

interface EventPanelProps {
  activeDay: Date;
  setShowPanel: React.Dispatch<React.SetStateAction<boolean>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  showPanel: boolean;
}
