import React from "react";

import "./Wrapper.scss";

const divStyle = {
  padding: "5px",
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: "row"
};

const wrapper = ({ styling, assignClass, onClick, children, disabled }) => (
  <div
    className={assignClass ? "wrapper " + `${assignClass}` : "wrapper"}
    onClick={!disabled && onClick ? onClick : () => {}}
    style={{
      ...divStyle,
      ...styling
    }}
  >
    {children}
  </div>
);

export default wrapper;
