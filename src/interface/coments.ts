export interface IGetIdeaCommentResponse {
  content: string;
  user: {
    fname: string;
    lname: string;
  };
  createdAt: string
  replies: {
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
}
