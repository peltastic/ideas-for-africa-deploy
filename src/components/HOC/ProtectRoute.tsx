"use client";
import { setCurrentLink } from "@/lib/reducers/route";
import { RootState } from "@/lib/store";
import { notify } from "@/utils/toast";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

type Props = {};

const WIthAuth = (WrappedComponent: any) => {
  const Auth = (props: any) => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useSelector(
      (state: RootState) => state.persistedState.auth.authStatus
    );

    useEffect(() => {
      dispatch(setCurrentLink(pathname));
      if (auth === "LOGGED_OUT") {
        notify("You're logged out or session expired, Please Log In", "error");
        router.push("/auth/login");
      }
    }, [auth]);

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default WIthAuth;
