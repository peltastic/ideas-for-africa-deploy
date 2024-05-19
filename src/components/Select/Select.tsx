import React from "react";
import * as Select from "@radix-ui/react-select";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  options?: { value: any; label: string }[];
  placeholder?: string;
  style2?: boolean;
  changed?: (value: any) => void;
  value?: any;
};

const SelectComponent = (props: Props) => {
  return (
    <Select.Root value={"1"} onValueChange={props.changed}>
      <Select.Trigger
        className={`px-6 py-3 gap-3  font-semibold text-sm bg-white outline-none border border-gray  inline-flex items-center justify-center rounded-full`}
      >
        <Select.Value
          className=" "
          placeholder={props.placeholder}
        />
        <Select.Icon className={`   `}>
          <IoIosArrowDown className="text-2xl" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content>
          <Select.ScrollUpButton />
          <Select.Viewport className="  mt-[5rem] px-12 rounded-md py-6 w-[18rem]">
            {props.options?.map((el) => (
              <Select.Item
                key={el.value}
                className="text-white cursor-pointer dark:text-black font-bold py-1 text-lg"
                value={el.value}
              >
                <Select.ItemText>{el.label}</Select.ItemText>
              </Select.Item>
            ))}

            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectComponent;
