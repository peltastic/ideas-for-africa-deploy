import React, { ReactNode } from "react";
import { HoverCard, Button, Text, Group } from "@mantine/core";

type Props = {
  children: ReactNode;
  text: string;
  textSize?: "lg" | "sm" | "md" | "xl" | "xs";
  fit?: boolean
};

const HoverCardComponent = (props: Props) => {
  return (
    <Group justify="center">
      <HoverCard width={props.fit ? "fit" : 280}  shadow="md">
        <HoverCard.Target>{props.children}</HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size={props.textSize || "sm"}>{props.text}</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
};

export default HoverCardComponent;
