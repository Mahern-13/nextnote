import React from "react";
import { SIZES, TYPES } from "../../consts";
import "./Button.scss";

const BaseButton = ({
  text,
  onClick,
  disabled,
  buttonType,
  buttonSize,
  styling
}) => (
  <button
    style={styling}
    disabled={disabled}
    onClick={onClick}
    className={`button button-${buttonType} button-${[
      SIZES[buttonSize] || SIZES.MEDIUM
    ]}`}
  >
    {text}
  </button>
);

export const Default = props => (
  <BaseButton {...props} buttonType={TYPES.DEFAULT} />
);

export const Primary = props => (
  <BaseButton {...props} buttonType={TYPES.PRIMARY} />
);
export const Secondary = props => (
  <BaseButton {...props} buttonType={TYPES.SECONDARY} />
);
