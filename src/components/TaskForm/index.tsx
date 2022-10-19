import { useState } from "react";
import toast from "react-hot-toast";
import { v4 } from "uuid";

import { useAddTask } from "store/hooks";
import { Event } from "models";

export const TaskForm = (props: TaskFormProps) => {
  const { setIsOpen } = props;

  const [formData, setFormData] = useState<Event>({
    title: "",
    description: "",
    id: "1",
    startDate: new Date(),
    endDate: new Date(),
  });

  const onAddTask = useAddTask();

  const notify = () =>
    toast("Событие успешно добавлено!", {
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
        id: v4(),
      };
    });
  };

  const handleChangeEndDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const date = formData.startDate;
    const dateCopy = new Date(date.getTime());
    const value = event.target.value;

    dateCopy.setTime(date.getTime() + Number(value) * 60 * 60 * 1000);

    setFormData((prev: Event) => {
      return {
        ...prev,
        endDate: dateCopy,
      };
    });
  };

  const handleChangeStartDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setFormData((prev: Event) => {
      return {
        ...prev,
        startDate: new Date(value),
      };
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddTask(formData);
    setIsOpen(false);
    notify();
  };

  return (
    <div className="w-[500px] bg-base-100">
      <h2 className="text-xl text-white mb-4">Новое событие</h2>
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Добавьте тему события"
          className="input input-bordered input-info w-full"
          onChange={handleChange}
        />
        <div className="flex gap-2">
          <label className="label w-1/2">
            <span className="label-text">Дата начала события</span>
          </label>

          <label className="label w-1/2">
            <span className="label-text">Продолжительность</span>
          </label>
        </div>
        <div className="flex gap-2">
          <input
            name="startDate"
            type="datetime-local"
            className="input input-bordered input-info w-1/2"
            onChange={handleChangeStartDate}
          />

          <select
            className="select w-1/2 select-info"
            onChange={handleChangeEndDate}
          >
            <option value={0.25}>15 минут</option>
            <option value={0.5}>30 минут</option>
            <option value={0.75}>45 минут</option>
            <option value={1}>60 минут</option>
          </select>
        </div>
        <textarea
          name="description"
          className="textarea input-bordered w-full mb-2 textarea-info"
          placeholder="Описание события"
          onChange={handleChange}
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
}
