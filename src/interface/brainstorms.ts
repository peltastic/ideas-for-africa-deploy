export interface IGetBrainstormGroupsResponse {
  groups: {
    admin: string;
    adminFname: string;
    name: string;
    ideadId: string;
    _id: string;
    status: "Not a member" | "requested"
    canJoin: boolean
  }[];
  ideaCreator: {
    fname: string;
    lname: string;
    pow: string;
  };
  title: string;
}
