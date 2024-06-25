import "./App.css";

import toast from "react-hot-toast";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, changeStatusTodo, allDeleteTodo } from "./app/todoSlice";

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
        {" "}
        <h1>Todo list - {todos.length}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <span>Text:</span>
            <input ref={inputText} type="text" />
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
                <input
                  onClick={() => dispatch(changeStatusTodo(todo.id))}
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <button onClick={() => dispatch(removeTodo(todo.id))}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <div className="data-count">
          <h4>Completed: {completedCount}</h4>
          <h4>Uncompleted: {unCompletedCount}</h4>
          <button onClick={() => dispatch(allDeleteTodo())}>Delete all of them!</button>
        </div>
      </div>
    </div>
  );
}

export default App;
