import { useState } from "react";
import "./App.css";
import DocumentViewer from "./components/DocumentViewer";

function App() {
  const [documentId] = useState<number | null>(1);

  return <DocumentViewer documentId={documentId} />;
}

export default App;
