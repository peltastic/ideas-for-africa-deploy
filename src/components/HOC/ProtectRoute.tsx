import { RootState } from "@/lib/store";
import { notify } from "@/utils/toast";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {};

const WIthAuth = (WrappedComponent: any) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const auth = useSelector(
      (state: RootState) => state.persistedState.auth.authStatus
    );

    useEffect(() => {
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
