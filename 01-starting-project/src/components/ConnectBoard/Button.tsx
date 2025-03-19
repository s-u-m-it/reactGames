import React from "react";
import classes from "./Button.module.css";

const Button: React.FC<{
  loc: string;
  xLoc: number;
  yLoc: number;
  children: React.ReactNode;
  onClick: (arg0: number, arg1: number) => void;
  disabled: boolean;
}> = (props) => {
  return (
    <button
      className={classes.slot}
      style={{
        backgroundColor:
          props.children === " " ? "white" : props.children!.toString(),
      }}
      onClick={() => props.onClick(props.xLoc, props.yLoc)}
      disabled={props.disabled}
    ></button>
  );
};

export default Button;
