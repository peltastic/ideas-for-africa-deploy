import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  classname: string;
  clicked: () => void;
};

const Button = ({ children, classname }: Props) => {
  return <button className={classname}>{children}</button>;
};

export default Button;
