import React from "react";
import ErrorCancel from "/public/assets/errorCancel.svg";
import Image from "next/image";

type Props = {
  message: string;
  closeMessage: () => void;
};

const AuthError = (props: Props) => {
  return (
    <div className="w-full text-xs px-6 py-4 rounded-full bg-errorFill text-errorText flex items-center">
      <p className="mr-auto">{props.message}</p>
      <div className="cursor-pointer" onClick={props.closeMessage}>
        <Image src={ErrorCancel} alt="error-image" />
      </div>
    </div>
  );
};

export default AuthError;
