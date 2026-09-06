import { API_URL } from "../config";

type DocumentViewerProps = { documentId: number | null };

function DocumentViewer({ documentId }: DocumentViewerProps) {
  if (documentId == null) {
    return <p>Select or upload a document to get started.</p>;
  }

  return <iframe src={`${API_URL}/documents/${documentId}/file`} />;
}

export default DocumentViewer;
