import React from "react";

function DateCurrent() {
  var d = new Date();
  return (
    <div>{`${d.getMonth() + 1} - ${d.getDate()} - ${d.getFullYear()}`}</div>
  );
}
export default DateCurrent;
