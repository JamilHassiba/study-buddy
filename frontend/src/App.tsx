import { useEffect, useState } from "react";
import "./App.css";
import DocumentViewer from "./components/DocumentViewer";
import TopBar from "./components/TopBar";
import type { DocumentOut } from "./types/api";
import { uploadDocument } from "./api/documents";
import { listDocuments } from "./api/documents";

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

  function onSelect(documentId: number): void {
    setDocumentId(documentId);
  }

  return (
    <>
      <TopBar
        documents={documents}
        selectedId={documentId}
        onUpload={onUpload}
        onSelect={onSelect}
      />
      <DocumentViewer documentId={documentId} />
    </>
  );
}

export default App;
