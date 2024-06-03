export interface ICreateIdeaPayload {
  headline: string;
  summary: string;
  category: string;
  body: string;
  pitchs: {step: string, count: string}[];
  minbud: string;
  maxbud: string;
  userId?: string;
  banner: File | null;
  files?: File | null;
}

export interface IGetIdeasResponse {
  _id: string
  headline: string
  budget: string
  category: string
  subcategory: string
  summary: string
  files: any
  createdAt: string,
}
