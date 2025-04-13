import { ReactElement } from "react";

interface ButtonProps {
  variant : "primary" | "secondary";
  size : "sm" | "md" | "lg";
  text : string;
  startIcon ?: ReactElement;
  endIcon ?: ReactElement;
  onClick : () => void;
}

const variantStyles = {
  "primary" : "bg-purple-600 text-white",
  "secondary" : "bg-purple-300 text-purple-600"
}

const sizeStyles = {
  "sm" : "py-1 px-2",
  "md" : "py-2 px-4",
  "lg" : "py-4 px-6"
}


const defaultStyles = "rounded-md p-4 flex";

export const Button = (props : ButtonProps) => {
  return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${onclick = props.onClick}`}>
    {props.startIcon ? <div className="pr-2">{props.startIcon    }</div> : null} {props.text} {props.endIcon ? <div className="pl-2">{props.endIcon}</div> : null}
  </button>
}