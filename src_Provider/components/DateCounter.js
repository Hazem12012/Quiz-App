import { useState, useReducer } from "react";

function DateCounter() {
  function reducer(state, action) {
    switch (action) {
      case "plus":
        return state + step;
      case "minus":
        return state - step;
      case "reset":
        return 0;
      default:
        return state + action;
    }
  }

  const [step, setStep] = useState(1);
  const initialvalue = 0;
  const [count, dispath] = useReducer(reducer, initialvalue);

  // This mutates the date object.
  const date = new Date("june 1 2005");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispath("minus");
  };

  const inc = function () {
    dispath("plus");
  };

  const defineCount = function (e) {
    dispath(Number(e.target.value));
  };

  const defineStep = function (e) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    dispath("reset");
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
