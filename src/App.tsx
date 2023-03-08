import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import Input from "./Input";

interface Task {
  main: string;
  sub: string;
  isComplete: boolean;
  id: number;
}

type simpleTask = Task[];

export function App() {
  const [tasks, updateTasks] = useState<simpleTask>([]);
  const firstUpdate = useRef(true);

  const [mainTask, updateMainTask] = useState("");
  const [subTask, updateSubTask] = useState("");

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const newTask = {
      main: mainTask,
      sub: subTask,
      id: tasks.length,
      isComplete: false,
    };
    if (newTask.main !== "" || newTask.sub !== "") {
      updateTasks((prev) => [...prev, newTask]);
    }
  }, [mainTask, subTask]);

  const items = tasks.map((task) => {
    return (
      <div
        className="card w-96 bg-primary text-primary-content shadow-xl my-4"
        key={task.id}
      >
        <div className="card-body">
          <h2 className="card-title text-2xl">{task.main}</h2>
          <p className="text-xl mb-4">{task.sub}</p>
          {task.isComplete ? <p className="font-semibold">Complete</p> : <p className="font-semibold">Not done yet</p>}
          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-success"
              id={task.id.toString()}
              onClick={completeTask}
            >
              Complete
            </button>
            <button
              className="btn btn-error"
              onClick={deleteTask}
              id={task.id.toString()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });

  function deleteTask(e: React.MouseEvent) {
    const currentTaskId = e.currentTarget.id;

    // updateTasks(oldList => [...oldList, ])
    const newList = tasks.filter((task) => task.id !== Number(currentTaskId));
    console.log(newList);
    console.log(tasks);

    updateTasks(newList);
  }

  function completeTask(e: React.MouseEvent) {
    const newList = tasks.map((task) => {
      if (task.id === Number(e.currentTarget.id)) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    updateTasks(newList);
  }

  return (
    <div className="">
      <div className="navbar bg-base-100 px-4">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">todo</a>
        </div>
      </div>

      {tasks.length !== 0 ? (
        ""
      ) : (
        <div className="text-center mb-4">
          <h1 className="md:text-5xl font-bold mb-2">Let's Get Started</h1>
          <p>Add a task to get started.</p>
        </div>
      )}
      <Input updateMain={updateMainTask} updateSub={updateSubTask} />

      <h2 className="text-4xl my-4 font-bold text-center">
        Your list: {tasks.length}
      </h2>
      <div className="text-center mt-6 grid grid-cols-2 md:grid-cols-3 gap-2 mx-12">
        {items}
      </div>
    </div>
  );
}
