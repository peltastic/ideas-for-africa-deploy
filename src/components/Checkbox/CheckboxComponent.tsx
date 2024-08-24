import { Checkbox } from "@mantine/core";
import React from "react";

type Props = {
  checked: boolean;
  setChecked: (checked: boolean) => void;
};

const CheckboxComponent = ({ checked, setChecked }: Props) => {
  return (
    <Checkbox
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
    />
  );
};

export default CheckboxComponent;
