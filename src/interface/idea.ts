export interface ICreateIdeaPayload {
  headline: string;
  summary: string;
  category: string;
  body: string;
  pitch: string;
  minbud: string;
  maxbud: string;
  userId?: string;
  banner: File | null;
  files?: File | null;
}
