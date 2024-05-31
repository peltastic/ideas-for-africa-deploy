import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  classname: string;
  type?: "submit" | "reset" | "button" | undefined
  clicked?: () => void;
  disabled?: boolean
};

const Button = ({ children, classname, type, clicked, disabled }: Props) => {
  return <button disabled={disabled} onClick={clicked} type={type} className={classname}>{children}</button>;
};

export default Button;
