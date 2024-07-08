export interface ICreateIdeaPayload {
  headline: string;
  summary: string;
  category: string;
  body: string;
  pitchs: { step: string; count: string }[];
  minbud: string;
  maxbud: string;
  userId?: string;
  banner: File | null;
  files?: File[] | null;
}

export interface IGetIdeasResponse {
  _id: string;
  headline: string;
  category: string;
  subcategory: string;
  summary: string;
  files: any;
  likes: string
  createdAt: string;
  banner: string;
  fname: string;
  lname: string;
  userId: string;
  pow?: string;
  profile?: {
    ppicture: string;
  };
  thumb?: {
    path: string;
  }[];
}

export interface IModifyIdeaPayload {
  headline: string;
  summary: string;
  body: string;
  pitches: string;
  minbud: string;
  maxbud: string;
  category: string;
  userId: string;
}

export interface IGetSingleIdeaResponse {
  idea: {
    _id: string;
    maxbud?: string;
    minbud?: string;
    category: string;
    body: string;
    createdAt: string;
    headline: string;
    summary: string;
  };
  userHasLiked: boolean;
  likes: number;
  count: number;
  pitches?: {
    step: string;
    count: string;
  }[];
  thumbs: {
    path: string;
  }[];
  user: {
    _id: string;
    fname: string;
    lname: string;
  };
  profile: {
    pow: string;
    title: string;
    _id: string;
    ppicture: string;
  };
}
