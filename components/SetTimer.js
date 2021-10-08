import React, { useEffect, useRef } from "react";

function useTimer(init) {
  const [timer, setTimer] = React.useState(init);
  const [running, setRunning] = React.useState(false);

  const [stoppage, setStoppage] = React.useState([]);
  const [stoppageId, setStoppageId] = React.useState(1);

  let timerID = useRef();
  let initValue = useRef();
  let stoppedValue = useRef();

  if (running) {
    initValue.current = init;
  }

  useEffect(() => {
    if (running) {
      if (timer > 0) {
        timerID.current = setInterval(() => setTimer(timer - 1), 1000);
      } else {
        setTimer(initValue.current);
      }
    }
    return () => {
      clearInterval(timerID.current);
    };
  }, [timer]);

  const start = () => {
    console.log("started");
    setRunning(true);
    setTimer(timer - 1);
  };
  const stop = () => {
    stoppedValue.current = timer;
    setStoppage([
      ...stoppage,
      { id: stoppageId, stoppedAt: stoppedValue.current },
    ]);
    setStoppageId(stoppageId + 1);

    setTimer(initValue.current);
    setRunning(false);
    // clearInterval(timerID.current);
  };

  return { timer, setTimer, start, stop, stoppage, setStoppage, setStoppageId };
}
export default useTimer;
