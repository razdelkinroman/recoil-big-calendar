import { useRecoilState } from "recoil";
import { eventsAtom } from "./atoms";
import { Event } from "models";

export const useAddTask = () => {
  const [items, setItems] = useRecoilState(eventsAtom);

  return (newTask: Event) => setItems([...items, newTask]);
};
