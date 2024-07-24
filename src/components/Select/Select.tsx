import React from "react";
import { Select } from "@mantine/core";
import { IoIosArrowDown } from "react-icons/io";
import classes from "@/app/styles/select.module.css";

type Props = {
  options?: { value: any; label: string }[];
  placeholder?: string;
  style2?: boolean;
  changed?: (value: any) => void;
  value?: any;
  label?: string;
  size: "sm" | "lg" | "md" | "xs" | "xl";
  thinLabel?: boolean
  radius?: "sm" | "lg" | "md" | "xs" | "xl";
  default?: string
  searchable?: boolean
  
};

const SelectComponent = (props: Props) => {
  const icon = <IoIosArrowDown className="font-semibold text-black" />;
  return (
    <Select
      label={props.label}
      radius={props.radius || "xl"}
      size={props.size}
      classNames={{label: props.thinLabel ? classes.label2 : classes.label}}
      className="font-semibold placeholder:text-black" 
      value={props.value || null}
      data={props.options}
      defaultValue={props.default}
      rightSection={icon}
      placeholder={props.placeholder}
      onChange={props.changed}
      searchable={props.searchable}
    />
  );
};

export default SelectComponent;
