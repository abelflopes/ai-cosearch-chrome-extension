import localforage from "localforage";
import { type Actions } from "../types";

function isDataItem(value: unknown): value is DataItem {
  return (
    typeof value === "object" &&
    value !== null &&
    "url" in value &&
    "content" in value &&
    "response" in value
  );
}

function isDataItemList(value: unknown): value is DataItem[] {
  return value instanceof Array && value.every(isDataItem);
}

export interface DataItem {
  url: string;
  content: string;
  response: string;
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
    (value: Omit<DataItem, "date">) =>
    async (state: State): Promise<State> => {
      const stored = await localforage.getItem("data");

      if (!isDataItemList(stored)) {
        await localforage.removeItem("data");
        throw new Error("Stored data is invalid");
      }

      const cachedResponse = stored.find((i) => i.url === value.url && i.content === value.content);

      const data: DataItem[] = [
        ...state.data,
        cachedResponse || {
          url: value.url,
          content: value.content,
          date: new Date().toISOString(),
          response: "", // TODO: Add response / openai prompt
        },
      ];

      await localforage.setItem("data", data);

      return {
        data,
      };
    },
} satisfies Actions<State>;
