import React, { useEffect } from "react";
import { useVerifyUserEmailMutation } from "@/lib/features/auth/auth";
import { useSearchParams } from "next/navigation";
import Logo from "/public/assets/logo.svg";
import Image from "next/image";
import TailwindSpinner from "../Spinner/TailwindSpinner";
import EmailSvg from "/public/assets/email.svg";
import SuccessSvg from "/public/assets/success.svg"
import Link from "next/link";
import { IoHome } from "react-icons/io5";


type Props = {};

const Verify = (props: Props) => {
  const params = useSearchParams();
  const [verifyEmail, { data, isLoading }] = useVerifyUserEmailMutation();

  useEffect(() => {
    const id = params.get("userId");
    const vcode = params.get("vcode");
    if (id && vcode) {
      verifyEmail({
        userId: id,
        vcode,
      });
    }
  }, []);
  return (
    <div className="h-screen">
      <div className="absolute left-8 top-10">
        <Image src={Logo} alt="logo" />
      </div>
      {isLoading ? (
        <div className="flex justify-center flex-col items-center fixed text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <TailwindSpinner />
          <p className="mt-3">Verifying Email...</p>
        </div>
      ) : (
        <div className="fixed flex flex-col items-center text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-xl font-semibold mb-4">
            Email Verification Successful!
          </h1>
          <div className="w-[10rem] mx-auto">
            <Image src={SuccessSvg} alt="email-svg" className="w-full" />
          </div>
          <Link
          className="w-[10rem] flex items-center mt-8 justify-center text-sm md:w-auto mb-6 md:mb-0 rounded-full px-8 py-4 md:py-3 bg-primary text-white  border-primary border"
          href={"/"}
        >
            <IoHome className="mr-1" />
          <button>Home</button>
        </Link>
        </div>
      )}
    </div>
  );
};

export default Verify;
