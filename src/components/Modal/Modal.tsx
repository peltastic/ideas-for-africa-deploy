import { Modal } from "@mantine/core";
import React, { ReactNode } from "react";

type Props = {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: string
  centered?: boolean
  withCloseButton?: boolean 
};

const ModalComponent = (props: Props) => {
  return (
    <Modal withCloseButton={!props.withCloseButton}  centered={props.centered}  size={props.size} opened={props.opened} onClose={props.onClose}>
      {props.children}
    </Modal>
  );
};

export default ModalComponent;
