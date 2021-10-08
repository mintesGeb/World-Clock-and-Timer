import React, { useEffect, useState } from "react";
import useShowTime from "./ShowTime";

const fetchTime = (country) => {
  return fetch(`http://worldtimeapi.org/api/timezone/${country}`).then((res) =>
    res.json()
  );
};

function Clock({ country }) {
  const [clock, setClock] = useState("Clock");

  useEffect(() => {
    setTimeout(() => {
      fetchTime(country).then((data) =>
        setClock(data.datetime.split("T")[1].split(".")[0])
      );
    }, 1000);
  }, [clock]);

  return (<div>
    {clock}
    
    </div>);
}
export default Clock;
