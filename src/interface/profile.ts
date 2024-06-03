interface IUpdateProfilePayload {
  // phone?: string
  // address?: string;
  // state?: string;
  country?: string;
  title?: string;
  pow: string;
  position?: string;
  url?: string;
}

interface IGetUserProfileResponse {
  email: string,
     fname: string,
     lname: string
     profile: {
      _id: string
      pow: string
      position: string
      title: string
      country: string
      url: string
     } | null
} 
