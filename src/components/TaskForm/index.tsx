import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import toast from "react-hot-toast";
import { v4 } from "uuid";

import { useAddTask, useEditTask } from "store/hooks";
import { eventsAtom } from "store/atoms";
import { Event } from "models";

const initState = {
  title: "",
  description: "",
  id: "1",
  startDate: "",
  endDate: "",
};

export const TaskForm = (props: TaskFormProps) => {
  const { setIsOpen, activeEventId } = props;
  const [formData, setFormData] = useState<Event>({
    ...initState,
  });

  const allEvents = useRecoilValue(eventsAtom);
  const onAddTask = useAddTask();
  const onEditTask = useEditTask();

  const notify = (text: string) =>
    toast(text, {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "green",
        color: "#fff",
      },
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev: Event) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (activeEventId) {
      onEditTask(formData);
      notify("Событие успешно отредактировано");
    } else {
      onAddTask({ ...formData, id: v4() });
      notify("Событие успешно создано");
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const event =
      allEvents.find((items) => items.id === activeEventId) || initState;

    setFormData(event);
  }, [activeEventId, allEvents, setIsOpen]);

  console.log("activeEventId", activeEventId);
  return (
    <div className="w-[500px] bg-base-100">
      <h2 className="text-xl text-white mb-4">
        {activeEventId ? "Редактирование события" : "Новое событие"}
      </h2>
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Добавьте тему события"
          className="input input-bordered input-info w-full"
          onChange={handleChange}
          value={formData.title}
        />
        <div className="flex gap-2">
          <label className="label w-1/2">
            <span className="label-text">Время начала</span>
          </label>

          <label className="label w-1/2">
            <span className="label-text">Время окончания</span>
          </label>
        </div>
        <div className="flex gap-2">
          <input
            name="startDate"
            type="datetime-local"
            className="input input-bordered input-info w-1/2"
            onChange={handleChange}
            value={formData.startDate}
          />

          <input
            name="endDate"
            type="datetime-local"
            className="input input-bordered input-info w-1/2"
            onChange={handleChange}
            value={formData.endDate}
          />
        </div>
        <textarea
          name="description"
          className="textarea input-bordered w-full mb-2 textarea-info"
          placeholder="Описание события"
          onChange={handleChange}
          value={formData.description}
        ></textarea>

        <button type="submit" className="btn btn-info">
          Добавить
        </button>
      </form>
    </div>
  );
};

interface TaskFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeEventId: string;
}
