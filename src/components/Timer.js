import { useEffect, useState } from "react";

function Timer({ dispatch, scoundRemaining }) {
  const mint = Math.floor(scoundRemaining / 60);
  const scound = scoundRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },

    [dispatch]
  );

  return (
    <div className="timer">
      {" "}
      {mint < 10 && "0"}
      {mint}:{scound < 10 && "0"}
      {scound}
    </div>
  );
}

export default Timer;
