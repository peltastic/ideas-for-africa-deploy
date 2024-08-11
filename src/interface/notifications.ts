export interface IGetProfileNotificationResponse {
  _id: string;
  title: string;
  time: string;
  body: string;
  type?: "Request" | "Comment" | "Response" | "Invite"
  action: {
    userId: string;
    memberId: string
    groupId: string;
    indicatorId: string;
    username: string;
    typeId: string;
    ideaheadline: string
    IdeaId: string
    _id: string;
  };
}
