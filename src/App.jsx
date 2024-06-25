import "./App.css";

import toast from "react-hot-toast";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaTrashCan } from "react-icons/fa6";
import { ImCheckboxChecked } from "react-icons/im";

import {
  addTodo,
  removeTodo,
  changeStatusTodo,
  allDeleteTodo,
} from "./app/todoSlice";

function App() {
  const dispatch = useDispatch();
  const inputText = useRef();

  const { todos, completedCount, unCompletedCount } = useSelector(
    (state) => state.todos
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputText.current.value.trim();
    if (value) {
      dispatch(
        addTodo({
          id: Math.random(),
          text: value,
          completed: false,
        })
      );
      toast.success("Added successfully!");
    } else {
      toast.error("Please, Write something!");
    }

    inputText.current.value = "";
  };
  return (
    <div className="wrapper">
      <video
        className="bg-video"
        src="./main-bg-video.mp4"
        autoPlay
        muted
        loop
      ></video>
      <div className="data-wrapper">
        <h1 className="text-3xl underline text-center">
          Todo list - {todos.length}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <span>Text:</span>
            <input placeholder="Add todo" ref={inputText} type="text" />
          </div>
          <button>Add</button>
        </form>
        {todos.map((todo) => {
          return (
            <div
              className={`todo ${todo.completed ? "completed" : ""}`}
              key={todo.id}
            >
              <h4>{todo.text}</h4>
              <div>
                <button
                  checked={todo.completed}
                  readOnly
                  onClick={() => dispatch(changeStatusTodo(todo.id))}
                >
                  <ImCheckboxChecked />
                </button>
                <button onClick={() => dispatch(removeTodo(todo.id))}>
                  <FaTrashCan />
                </button>
              </div>
            </div>
          );
        })}
        <div className="data-count">
          <h4>Completed: {completedCount}</h4>
          <h4>Uncompleted: {unCompletedCount}</h4>
          <button onClick={() => dispatch(allDeleteTodo())}>
            Delete all of them!
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
