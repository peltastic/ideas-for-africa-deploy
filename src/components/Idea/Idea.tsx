import React, { useEffect } from "react";
import IdeaGrid from "./IdeaGrid";
import ModifyIdeaGrid from "./ModifyIdeaGrid";
import { useLazyGetSingleIdeaQuery } from "@/lib/features/auth/ideas";
import { useParams } from "next/navigation";
import IdeaPageSkeleton from "../Skeleton/IdeaPageSkeleton";

type Props = {};

const Idea = (props: Props) => {
  const { id } = useParams();
  const [getIdea, { data }] = useLazyGetSingleIdeaQuery();
  useEffect(() => {
    getIdea({ id: id as string });
  }, []);
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  return (
    <div className="mx-auto max-w-[2000px] rounded-tr-xl relative overflow-hidden rounded-tl-xl bg-white flex px-4 xs:px-10 py-10">
      <div className="w-full des:w-[60%] mr-auto">
        
        {data ? <IdeaGrid data={data} /> : <IdeaPageSkeleton />}
      </div>
      <div className="des:w-[35%] absolute des:relative translate-x-[120%] top-0 right-0 des:translate-x-0">
        <ModifyIdeaGrid />
      </div>
    </div>
  );
};

export default Idea;
