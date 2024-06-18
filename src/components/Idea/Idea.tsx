import React, { useEffect, useState } from "react";
import IdeaGrid from "./IdeaGrid";
import ModifyIdeaGrid from "./ModifyIdeaGrid";
import { useLazyGetSingleIdeaQuery } from "@/lib/features/ideas";
import { useParams } from "next/navigation";
import IdeaPageSkeleton from "../Skeleton/IdeaPageSkeleton";

type Props = {};

const Idea = (props: Props) => {
  const [openVH, setOpenVH] = useState<boolean>(false)
  const { id } = useParams();
  const [getIdea, { data }] = useLazyGetSingleIdeaQuery();
  useEffect(() => {
    getIdea({ id: id as string });
  }, []);
  const setOpenVHHandler = () => {
    setOpenVH(true)
  }
  const closeVHHandler = () => {
    setOpenVH(false)
  }
  return (
    <div className="mx-auto max-w-[2000px] rounded-tr-xl relative overflow-hidden rounded-tl-xl bg-white flex px-4 xs:px-10 py-10">
      <div className="w-full des:w-[60%] mr-auto">
        
        {data ? <IdeaGrid setOpenVH={setOpenVHHandler} data={data} /> : <IdeaPageSkeleton />}
      </div>
      <div className={`w-full des:w-[35%]  fixed des:relative transition-all  ${openVH ? "translate-x-0 z-[140]" : "translate-x-[120%]"}  top-0 right-0 des:translate-x-0`}>
        <ModifyIdeaGrid closeVH={closeVHHandler} />
      </div>
    </div>
  );
};

export default Idea;
