import React from "react";
import Wrapper from "../Wrapper/Wrapper";

import "./Card.scss";
import { TYPES } from "../../consts";

const BaseCard = ({ header, children, cardType }) => (
  <div className={`card card-${cardType || TYPES.default}`}>
    {header !== false && <div className="card-heading">{header}</div>}
    {header !== false && <div className="card-heading-border" />}
    <Wrapper styling={{ flexDirection: "column" }}>{children}</Wrapper>
  </div>
);

export const Default = props => (
  <BaseCard {...props} cardType={TYPES.DEFAULT} />
);

export const Primary = props => (
  <BaseCard {...props} cardType={TYPES.PRIMARY} />
);
export const Secondary = props => (
  <BaseCard {...props} cardType={TYPES.SECONDARY} />
);
