import { Menu } from "@mantine/core";
import React, { ReactNode } from "react";

type Props = {
  target: ReactNode;
  children: ReactNode;
};

const MenuComponent = (props: Props) => {
  return (
    <Menu position="bottom-end" offset={6}>
      <Menu.Target>{props.target}</Menu.Target>
      <Menu.Dropdown>
        {props.children}
      </Menu.Dropdown>

    </Menu>
  );
};

export default MenuComponent;
