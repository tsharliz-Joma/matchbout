"use client";
import React, {forwardRef} from "react";
import {cn} from "@/app/lib/utils";

const Button = forwardRef(({onClick, className, children, ...props}, ref) => {
  return (
    <button onClick={onClick} className={(cn(""), props)}>
      {children}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
