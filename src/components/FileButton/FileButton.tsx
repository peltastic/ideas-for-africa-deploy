import React, { ReactNode } from "react";
import { FileButton, Button, Group, Text } from "@mantine/core";

type Props = {
  setFile: (key: string, value: File | null) => void;
  children: ReactNode;
  accept: string;
};

const FileButtonComponent = ({ setFile, children, accept }: Props) => {
  return (
    <Group  justify="center">
      <FileButton
        onChange={(payload) => setFile("banner", payload)}
        accept={accept}
      >
        {(props) => (
          <button className="w-full" {...props}>
            {children}
          </button>
        )}
      </FileButton>
    </Group>
  );
};

export default FileButtonComponent;
