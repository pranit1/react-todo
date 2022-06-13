import { createSlice, PayloadAction, nanoid  } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

type Item = {
    id: string;
    text: string;
    done: boolean;
};

type State = {
    items: Array<Item>;
};

const initialState: State = {
    items: [{
        id:'1',
        text:'hello',
        done:false
    }],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState:initialState,
  reducers: {
    addTodo: {
        reducer: (state, action: PayloadAction<Item>) => {
          state.items.push(action.payload)
        },
        prepare: (text: string) => {
            const id = nanoid()
            return { payload: { id, text, done:false } }
          },
    },
    editTodo(state, action: PayloadAction<Item>) {
        const { id, text } = action.payload;
        const existingItem = state.items.find((item) => item.id === id);
        if (existingItem) {
          existingItem.text = text
        }
    }

  }
})

export const {addTodo, editTodo  } = todoSlice.actions
export const selectItems = (state: RootState) => {console.log('state',state); return state.todos.items}
export default todoSlice.reducer