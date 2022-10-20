import { useState } from "react";
import { Calendar, TaskForm, EventPanel } from "components";
import { ModalWrapper } from "ui/ModalWrapper";

export const Layout = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeDay, setActiveDay] = useState<Date>(new Date());
  const [activeEventId, setActiveEventId] = useState("");

  return (
    <div className="h-full w-full">
      <div className="flex h-full overflow-x-hidden">
        <Calendar setShowPanel={setShowPanel} setActiveDay={setActiveDay} />
        <div
          className={`${
            showPanel ? "w-[460px]" : "w-10 hover:w-16 hover:p-4"
          } transition-all  duration-500 `}
        >
          <EventPanel
            showPanel={showPanel}
            setShowPanel={setShowPanel}
            setShowForm={setShowForm}
            activeDay={activeDay}
            setActiveEventId={setActiveEventId}
          />
        </div>
      </div>
      <ModalWrapper isOpen={showForm} setIsOpen={setShowForm}>
        <TaskForm setIsOpen={setShowForm} activeEventId={activeEventId} />
      </ModalWrapper>
    </div>
  );
};
