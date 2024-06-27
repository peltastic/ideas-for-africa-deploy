import PostIdeaComment from "@/components/PostComment/PostIdeaComment";
import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  ideaId: string;


};

const Discussions = (props: Props) => {
  const profileInfo = useSelector((state: RootState) => state.persistedState.profile.profile)
  return (
    <div>
      <PostIdeaComment
        fname={profileInfo.fname}
        lname={profileInfo.lname}
        ideaId={props.ideaId}
      />
    </div>
  );
};

export default Discussions;
