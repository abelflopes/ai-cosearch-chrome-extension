import { type Actions } from "../types";

export interface DataItem {
  id: string;
  url: string;
  content: string;
  date: string;
}

export interface State {
  data: DataItem[];
}

export const initialState: State = {
  data: [],
};

export const actions = {
  reset: () => (): State => initialState,
  add:
    (value: DataItem) =>
    (state: State): State => ({
      data: [...state.data, value],
    }),
} satisfies Actions<State>;
