import { type Actions } from "../types";

export interface State {
  openAiApiKey: string | null;
}

export const initialState: State = {
  openAiApiKey: null,
};

export const actions = {
  reset: () => (): State => initialState,
} satisfies Actions<State>;
