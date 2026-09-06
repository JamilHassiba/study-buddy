import { useEffect, useState } from "react";
import "./App.css";
import DocumentViewer from "./components/DocumentViewer";
import TopBar from "./components/TopBar";
import type { DocumentOut } from "./types/api";
import { uploadDocument } from "./api/documents";
import { listDocuments } from "./api/documents";
import ChatPanel from "./components/ChatPanel";

function App() {
  const [documents, setDocuments] = useState<DocumentOut[]>([]);
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    listDocuments()
      .then(setDocuments)
      .catch((e) =>
        alert(e instanceof Error ? e.message : "Could not load documents."),
      );
  }, []);

  async function onUpload(file: File) {
    setIsUploading(true);

    try {
      const documentOut = await uploadDocument(file);
      setDocumentId(documentOut.document_id);
      setDocuments((currentDocs) => [documentOut, ...currentDocs]);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Upload failed.";
      alert(message);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <>
      <TopBar
        documents={documents}
        selectedId={documentId}
        onUpload={onUpload}
        onSelect={setDocumentId}
        isUploading={isUploading}
      />
      <DocumentViewer documentId={documentId} />
      <ChatPanel key={documentId ?? "none"} documentId={documentId} />
    </>
  );
}

export default App;
