import React, { useEffect } from "react";
const useShowTime = (init) => {
  const [time, setTime] = React.useState(init);

  const setTheTime = () => {
    let t = new Date();
    setTime(`${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`);
  };

  useEffect(() => {
    setInterval(setTheTime, 1000);
    // setTheTime();
  }, [time]);

  return [time, setTime];
};
export default useShowTime;
