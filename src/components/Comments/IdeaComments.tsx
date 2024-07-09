import React from "react";

type Props = {
  replies?: {
    _id: string;
    commentId: string;
    repliedToUserId: string;
    content: string;
    createdAt: string;
    user: {
      fname: string;
      lname: string;
      ppicture: string;
    };
  }[];
  content: string;
  fname?: string;
  lname?: string;
};

const IdeaComments = (props: Props) => {
  return (
    <div className="flex items-start my-10">
      <div className="text-sm  mr-4 bg-gradient-to-br from-[#5C6670] to-black1 text-white rounded-full p-1 h-[2.3rem] w-[2.3rem] flex items-center justify-center">
        <p>
          {props.fname ? props.fname[0] : "M"}
          {props.lname ? props.lname[0] : "O"}
        </p>
      </div>
      <div className="w-[80%]">
        <p className="font-semibold mb-2">{props.fname ? `${props.fname} ${props.lname}` : "Monica Brown" }</p>
        <p className="text-sm mb-2">{props.content}</p>
        <p className="text-xs text-gray1">3 days ago</p>
        <div className="w-full">
          {props.replies ? (
            <>
              {props.replies.map((el) => (
                <IdeaComments
                  fname={el.user.fname}
                  key={el._id}
                  lname={el.user.lname}
                  content={el.content}
                />
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default IdeaComments;
