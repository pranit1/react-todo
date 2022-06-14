import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

export type Item = {
  id: string;
  text: string;
  done: boolean;
};

type State = {
  items: Array<Item>;
};

const initialState: State = {
  items: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Item>) => {
        state.items.push(action.payload);
      },
      prepare: (text: string) => {
        const id = nanoid();
        return { payload: { id, text, done: false } };
      },
    },
    checkTodo(state, action: PayloadAction<Item>) {
      const { id, done } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.done = done;
      }
    },
    editTodo(state, action: PayloadAction<Item>) {
      const { id, text } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.text = text;
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items = [
        ...state.items.slice(0, index),
        ...state.items.slice(index + 1),
      ];
    },
  },
});

export const { addTodo, editTodo, checkTodo, deleteTodo } = todoSlice.actions;
export const selectItems = (state: RootState) => {
  return state.todos.items;
};
export default todoSlice.reducer;
