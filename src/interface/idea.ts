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
  likes: string;
  createdAt: string;
  banner: string;
  fname?: string;
  lname?: string;
  userId: string;
  pow?: string;
  count: number
  profile?: {
    ppicture: string;
    pow: string;
  };
  ppicture?: string;
  thumbPath?: string;
  thumb?: {
    path: string;
  }[];
  user?: {
    fname: string;
    lname: string;
  };
  wordpm: number
  viewCount: number
}

export interface IIdeaDocumentData {
  _id: string;
  originalName: string;
  path: string;
  ideaId: string;
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
  files?: File[] | null
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
  wordpm: number
  viewCounts: number
  profile: {
    pow: string;
    title: string;
    _id: string;
    ppicture: string;
  };

  documents: IIdeaDocumentData[];
}

export interface IGetTopLikedIdeas {
  _id: string;
  ppicture: string;
  summary: string;
  headline: string;
  thumbPath: string;
  userId: string;
  fname: string;
  lname: string;
  pow: string;
  category: string;
  createdAt: string;
}
