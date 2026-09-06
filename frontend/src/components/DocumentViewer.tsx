import { API_URL } from "../config";

type DocumentViewerProps = { documentId: number | null };

function DocumentViewer({ documentId }: DocumentViewerProps) {
  return <iframe src={`${API_URL}/documents/${documentId}/file`} />;
}

export default DocumentViewer;
