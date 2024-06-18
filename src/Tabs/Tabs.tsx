import React from "react";

type Props = {
  elements: any[];
  setVal: (el: any) => void;
  filterVal: string;
  profile?: boolean;
  idea?: boolean;
};

const Tabs = (props: Props) => {
  const responsiveTab = props.idea ? (
    <>
      <div
        className={`block sm:hidden items-center bg-gray3 px-1  py-1 rounded-full ${
          props.profile ? "flex" : "hidden lg:flex"
        }  w-fit `}
      >
        {props.elements.map((el, index) => {
          const jsx = (
            <div
              onClick={() => props.setVal(el)}
              key={el}
              className={`transition-all ${
                props.filterVal === el
                  ? " text-black1 font-medium bg-white rounded-full"
                  : "text-gray1"
              } cursor-pointer text-sm  font-medium py-3 px-2 xxs:px-4`}
            >
              <p>{el}</p>
            </div>
          );
          if (props.idea && index > 2) {
            return;
          } else {
            return jsx;
          }
        })}
      </div>
      <div
        className={`hidden sm:flex items-center bg-gray3 px-1  py-1 rounded-full ${
          props.profile ? "flex" : "hidden lg:flex"
        }  w-fit `}
      >
        {props.elements.map((el, index) => (
          <div
            onClick={() => props.setVal(el)}
            key={el}
            className={`transition-all ${
              props.filterVal === el
                ? " text-black1 font-medium bg-white rounded-full"
                : "text-gray1"
            } cursor-pointer text-sm  font-medium py-3 px-2 xxs:px-4`}
          >
            <p>{el}</p>
          </div>
        ))}
      </div>
    </>
  ) : (
    <div
      className={` items-center bg-gray3 px-1  py-1 rounded-full ${
        props.profile
          ? "flex overflow-scroll "
          : "hidden lg:flex"
      }w-fit  `}
    >
      {props.elements.map((el, index) => (
        <div
          onClick={() => props.setVal(el)}
          key={el}
          className={` transition-all ${
            props.filterVal === el
              ? " text-black1 font-medium bg-white rounded-full"
              : "text-gray1"
          } cursor-pointer   font-medium ${
            props.profile ? "py-2" : "py-3"
          }  px-2 xxs:px-4`}
        >
          <p>{el}</p>
        </div>
      ))}
    </div>
  );
  return <div>{responsiveTab}</div>;
};

export default Tabs;
