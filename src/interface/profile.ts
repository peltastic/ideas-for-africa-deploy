export interface IUpdateProfilePayload {
  // phone?: string
  // address?: string;
  // state?: string;
  country?: string;
  title?: string;
  pow: string;
  position?: string;
  url?: string;
}

export interface IGetUserProfileResponse {
  email: string;
  fname: string;
  lname: string;
  profile: {
    _id: string;
    pow: string;
    position: string;
    title: string;
    country: string;
    url: string;
    ppicture: string;
  } | null;
}

export interface IGetUserModifiedIdeasResponse {
  modifiedIdeas: {
    _id: string;
    headline: string;
    summary: string;
    userId: string;
    fname: string;
    lname: string;
    ppicture: string;
  }[];
}

export interface IGetUserBrainstromGroups {

  
}