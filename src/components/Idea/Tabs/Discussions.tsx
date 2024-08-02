import IdeaComments from "@/components/Comments/IdeaComments";
import PostIdeaComment from "@/components/PostComment/PostIdeaComment";
import { useLazyGetIdeaCommentsQuery } from "@/lib/features/comments";
import { RootState } from "@/lib/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
  ideaId: string;
};

const Discussions = (props: Props) => {
  const [getIdeaComments, { data, isFetching }] = useLazyGetIdeaCommentsQuery();

  useEffect(() => {
    getIdeaComments(props.ideaId); 
  }, []);

  const profileInfo = useSelector(
    (state: RootState) => state.persistedState.profile.profile
  );
  return (
    <>
      <div>
        <PostIdeaComment
          fname={profileInfo.fname}
          lname={profileInfo.lname}
          ideaId={props.ideaId}
          getIdeaComments={() => getIdeaComments(props.ideaId)}
        />
      </div>
      <div className="flex items-center my-4">
        <p className="font-semibold">Comments</p>
      </div>
      <div className="">
        {isFetching ? (
          <div className=""></div>
        ) : (
          <div className="">
            {data?.comments?.map((el, index) => (
              <IdeaComments
                fname={el.user?.fname}
                lname={el.user?.lname}
                key={el.content + el.replies + index}
                content={el.content}
                replies={el.replies}
                createdAt={el.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Discussions;
