import { setCurrentLink } from "@/lib/reducers/route";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const SetRoute = (WrappedComponent: any) => {
  const Route = (props: any) => {
    const pathname = usePathname();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setCurrentLink(pathname));
    }, []);
    return <WrappedComponent {...props} />;
  };
  return Route;
};

export default SetRoute;
