import React, { useEffect, useState } from "react";
import IdeaGrid from "./IdeaGrid";
import ModifyIdeaGrid from "./ModifyIdeaGrid";
import {
  useLazyGetSingleIdeaQuery,
  useLazyGetSingleModifiedIdeaQuery,
} from "@/lib/features/ideas";
import { useParams, useRouter } from "next/navigation";
import IdeaPageSkeleton from "../Skeleton/IdeaPageSkeleton";
import { getCookie } from "@/utils/storage";
import VersionHistorySkeleton from "../Skeleton/VersionHistorySkeleton";
import { IoChevronBackSharp } from "react-icons/io5";
import Button from "../Button/Button";

type Props = {
  modified?: boolean;
};

const Idea = (props: Props) => {
  const router = useRouter();
  const userId = getCookie("id");
  const [openVH, setOpenVH] = useState<boolean>(false);
  const { id, mid } = useParams();

  const [getIdea, { data, isFetching }] = useLazyGetSingleIdeaQuery();
  const [getModifiedIdea, result] = useLazyGetSingleModifiedIdeaQuery();
  useEffect(() => {
    if (props.modified) {
      getModifiedIdea(mid as string);
    }
    getIdea({ id: id as string, userId });
  }, []);
  const setOpenVHHandler = () => {
    setOpenVH(true);
  };
  const closeVHHandler = () => {
    setOpenVH(false);
  };
  return (
    <div className="mx-auto max-w-[2000px] rounded-tr-xl relative overflow-hidden rounded-tl-xl  bg-white flex px-4 xs:px-10 py-10">
      <div className="w-full des:w-[60%] mr-auto">
        {data && !props.modified ? (
          <IdeaGrid setOpenVH={setOpenVHHandler} data={data} />
        ) : result.data ? (
          <IdeaGrid setOpenVH={setOpenVHHandler} data={result.data} />
        ) : (
          <IdeaPageSkeleton />
        )}
      </div>
      <div
        className={`w-full des:w-[35%]  fixed des:relative transition-all  ${
          openVH ? "translate-x-0 z-[140]" : "translate-x-[120%]"
        }  top-0 right-0 des:translate-x-0`}
      >
        {data ? (
          <ModifyIdeaGrid
            modifiedIdea={props.modified || false}
            original={{
              fname: data.user.fname,
              lname: data.user.lname,
              pow: data.profile?.pow,
            }}
            id={data.idea._id}
            name={data.idea.headline}
            closeVH={closeVHHandler}
          />
        ) : (
          <VersionHistorySkeleton />
        )}
      </div>
    </div>
  );
};

export default Idea;
