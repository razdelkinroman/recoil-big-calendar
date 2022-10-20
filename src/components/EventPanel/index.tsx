import { useRecoilValue } from "recoil";
import { eventsAtom } from "store/atoms";
import { useRemoveTask } from "store/hooks";
import { ReactComponent as LeftDoubleArrow } from "assets/images/left-double-arrow.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/close.svg";

export const EventPanel = (props: EventPanelProps) => {
  const { setShowForm, activeDay, showPanel, setShowPanel, setActiveEventId } =
    props;
  const allEvents = useRecoilValue(eventsAtom);
  const onRemoveTask = useRemoveTask();

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
          onClick={() => {
            setShowForm(true);
            setActiveEventId("");
          }}
        >
          Новое событие
        </button>

        {dayEvents.map((event) => (
          <div
            className="flex flex-col text-gray-400 border-b border-gray-300"
            key={event.id}
          >
            <div className="flex gap-2 items-baseline p-1">
              <span className="text-white text-sm">
                {new Date(event.startDate).getHours()}:
                {new Date(event.startDate).getMinutes()}
              </span>
              <div
                className="flex flex-col grow cursor-pointer"
                onClick={() => {
                  setActiveEventId(event.id);
                  setShowForm(true);
                }}
              >
                <span className="text-white text-lg">{event.title}</span>
                <span className="text-sm">{event.description}</span>
              </div>
              <CloseIcon
                width={24}
                height={24}
                className="cursor-pointer shrink-0"
                onClick={() => onRemoveTask(event.id)}
              />
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
  setActiveEventId: React.Dispatch<React.SetStateAction<string>>;
  showPanel: boolean;
}
