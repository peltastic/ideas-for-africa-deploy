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
    <div className="rounded-tr-xl rounded-tl-xl bg-white flex px-10 py-10">
      <div className="w-[60%] mr-auto">
        
        {data ? <IdeaGrid data={data} /> : <IdeaPageSkeleton />}
      </div>
      <div className="w-[35%]">
        <ModifyIdeaGrid />
      </div>
    </div>
  );
};

export default Idea;
