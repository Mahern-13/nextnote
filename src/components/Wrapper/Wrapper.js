import React from "react";

import "./Wrapper.scss";

const divStyle = {
  padding: "5px",
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: "row"
};

const Wrapper = ({ styling, assignClass, onClick, children, disabled }) => (
  <div
    className={assignClass ? `wrapper ${assignClass}` : "wrapper"}
    onClick={!disabled && onClick ? onClick : () => {}}
    style={{
      ...divStyle,
      ...styling
    }}
  >
    {children}
  </div>
);

export const Column = props => (
  <Wrapper {...props} styling={{ ...props.styling, flexDirection: "column" }}>
    {props.children}
  </Wrapper>
);

export const Row = props => (
  <Wrapper {...props} sylying={{ ...props.styling, flexDirection: "row" }}>
    {props.children}
  </Wrapper>
);

export default Wrapper;
