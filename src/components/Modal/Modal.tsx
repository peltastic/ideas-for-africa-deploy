import { Modal } from "@mantine/core";
import React, { ReactNode } from "react";

type Props = {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: string
};

const ModalComponent = (props: Props) => {
  return (
    <Modal  size={props.size} opened={props.opened} onClose={props.onClose}>
      {props.children}
    </Modal>
  );
};

export default ModalComponent;
