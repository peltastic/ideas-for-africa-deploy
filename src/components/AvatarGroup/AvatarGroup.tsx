"use client";
import React from "react";
import { Avatar } from "@mantine/core";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type Props = {
  avatars: string[];
};

const AvatarGroup = (props: Props) => {
  return (
    <Avatar.Group spacing={"sm"}>
      {props.avatars.map((el) => (
        <Avatar src={el} />
      ))}
      {/* <Avatar src="image.png" />
    <Avatar src="image.png" />
    <Avatar src="image.png" /> */}
      <Avatar>+{props.avatars.length}</Avatar>
    </Avatar.Group>
  );
};

export default AvatarGroup;
