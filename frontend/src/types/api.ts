export interface DocumentOut {
  document_id: number;
  file_name: string;
  upload_date: string;
}

export interface ChatRequest {
  document_id: number;
  query: string;
}

export interface SourceOut {
  index: number;
  content: string;
}

export interface ChatResponse {
  answer: string;
  sources: SourceOut[];
}
