import type { DocumentOut } from "../types/api";

type TopBarProps = {
  documents: DocumentOut[];
  selectedId: number | null;
  onUpload: (file: File) => void;
  onSelect: (documentId: number) => void;
};

function TopBar({ documents, selectedId, onUpload, onSelect }: TopBarProps) {
  return (
    <>
      <p>Study Buddy</p>

      <select
        name="documents"
        value={selectedId ?? ""}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="" disabled>
          Select a document
        </option>
        {documents.map((doc) => (
          <option key={doc.document_id} value={doc.document_id}>
            {doc.file_name}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
        }}
      />
    </>
  );
}

export default TopBar;
