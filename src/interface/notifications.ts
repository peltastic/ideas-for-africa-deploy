export interface IGetProfileNotificationResponse {
  _id: string;
  title: string;
  time: string;
  body: string;
  type?: "Request" | "Comment" | "Response"
  action: {
    userId: string;
    memberId: string
    groupId: string;
    indicatorId: string;
    username: string;
    typeId: string;
    _id: string;
  };
}
