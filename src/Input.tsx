import React, { useState } from "react";

interface InputProps {
  updateMain: (main: string) => void;
  updateSub: (main: string) => void;
}

export default function Input({
  updateMain,

  updateSub,
}: InputProps) {
  const [primary, updatePrimary] = useState("");
  const [secondary, updateSecondary] = useState("");

  function handleClick() {
    updateMain(primary);
    updateSub(secondary);
    updatePrimary("");
    updateSecondary("");
  }
  return (
    <div className="text-center my-12 space-x-2">
      <input
        type="text"
        value={primary}
        placeholder="Type here to add a task"
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => updatePrimary(e.target.value)}
      />
      <input
        type="text"
        value={secondary}
        placeholder="Type here to add details"
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => updateSecondary(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleClick}>
        Add
      </button>
      <div className="flex justify-center align-middle my-8">
        <div>
          <div className="card w-96 bg-primary text-primary-content overflow-auto">
            <div className="card-body">
              <h2 className="card-title">{primary}</h2>
              <p>{secondary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
