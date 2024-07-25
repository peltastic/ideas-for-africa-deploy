export interface IGetBrainstormGroupsResponse {
  groups: {
    admin: string;
    adminFname: string;
    name: string;
    ideadId: string;
    _id: string;
    status: "Not a member" | "requested";
    canJoin: boolean;
    text: string
  }[];
  ideaCreator: {
    fname: string;
    lname: string;
    pow: string;
    url?: string
  };
  title: string;
}

export interface IGroupMessagesResponse {
  _id: string;
  roomID: string;
  username: string;
  text: string;
  timestamp: string;
}

export interface IGetGroupMembers {
  _id: string
  userId: string
  profile: {
    fname: string
    lname: string
    ppicture: string
  }
}

export interface IGetGroupInfo {
  title: string
}