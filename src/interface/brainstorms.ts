export interface IGetBrainstormGroupsResponse {
  groups: {
    admin: string;
    adminFname: string;
    name: string;
    ideadId: string;
    _id: string;
    status: "Not a member" | "requested";
    canJoin: boolean;
    text: string;
  }[];
  ideaCreator: {
    fname: string;
    lname: string;
    pow: string;
    url?: string;
  };
  title: string;
}

export interface IGroupMessagesResponse {
  _id: string;
  roomID: string;
  username: string;
  text: string;
  timestamp: string;
  photourl?: string;
}

export interface IGetGroupMembers {
  _id: string;
  userId: string;
  profile: {
    fname: string;
    lname: string;
    ppicture: string;
  };
}

export interface IGetGroupInfo {
  title: string;
}

export interface IGetGroupInfoResponse  {
  group: {
    name: string;
    admin: string
    _id: string
    ideaId: string
  };
  fname: string
  lname: string
  profilepic: string
  pow: string
  ideaheadline: string
}

export interface IGetSearchBrainstormGroups {
  groups: {
    _id: string;
    ideaId: string;
    name: string;
    admin: string;
    text: string;
    createdAt: string;
    adminName: {
      fname: string;
      lname: string;
    };
    adminPpicture: string | "Not available"
    ideaHeadline: string;
    thumbnailPath: string;
    userMembershipStatus: "Not a member" | "accepted" | "requested"
  }[];
}
