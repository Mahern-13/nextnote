import React from "react";
import { SIZES, TYPES } from "../../consts";
import "./Button.scss";

const BaseButton = ({ text, onClick, disabled, buttonType, buttonSize }) => (
  <button
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
export const Warning = props => (
  <BaseButton {...props} buttonType={TYPES.SECONDARY} />
);