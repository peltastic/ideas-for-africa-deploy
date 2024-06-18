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
  createdAt: string;
  banner: string;
  fname: string;
  lname: string;
  userId: string;
  pow?: string;
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
  pitches?: {
    step: string;
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
    ppicture: string
  };
}
