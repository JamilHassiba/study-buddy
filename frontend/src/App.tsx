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

  useEffect(() => {
    listDocuments()
      .then(setDocuments)
      .catch((e) => console.error("Failed to load documents:", e));
  }, []);

  async function onUpload(file: File) {
    const documentOut = await uploadDocument(file);
    setDocumentId(documentOut.document_id);

    setDocuments((currentDocs) => [documentOut, ...currentDocs]);
  }

  return (
    <>
      <TopBar
        documents={documents}
        selectedId={documentId}
        onUpload={onUpload}
        onSelect={setDocumentId}
      />
      <DocumentViewer documentId={documentId} />
      <ChatPanel key={documentId ?? "none"} documentId={documentId} />
    </>
  );
}

export default App;
