import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./app/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
