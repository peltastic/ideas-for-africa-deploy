import Link from "next/link";
import React from "react";

type Props = {
    title?: string
};

const NotLoggedInModal = (props: Props) => {
  return (
    <div className="pb-8 px-9">
      <h1 className="font-semibold mb-4 text-lg">
        {props.title || "You need to be logged in to interact"}
      </h1>
      <div className="flex text-sm">
        <Link
          className="border border-primary text-sm text-primary xxs:mr-4 rounded-full py-2 px-5"
          href={"/auth/login"}
        >
          Log in
        </Link>
        <Link
          className="hidden xxs:block border text-sm border-primary bg-primary text-white rounded-full py-2 px-5"
          href={"/auth/register"}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default NotLoggedInModal;
