import { useRecoilState } from "recoil";
import { eventsAtom } from "./atoms";
import { Event } from "models";

export const useAddTask = () => {
  const [items, setItems] = useRecoilState(eventsAtom);

  return (newTask: Event) => setItems([...items, newTask]);
};

export const useRemoveTask = () => {
  const [items, setItems] = useRecoilState(eventsAtom);

  return (id: string) => {
    const filterItems = items.filter((item) => item.id !== id);

    return setItems([...filterItems]);
  };
};

export const useEditTask = () => {
  const [items, setItems] = useRecoilState(eventsAtom);

  return (event: Event) => {
    const filterItems = items.filter((item) => item.id !== event.id);

    return setItems([...filterItems, event]);
  };
};
