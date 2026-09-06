import type { DocumentOut } from "../types/api";
import loadingGif from "../assets/loading-spinner.gif";

type TopBarProps = {
  documents: DocumentOut[];
  selectedId: number | null;
  onUpload: (file: File) => void;
  onSelect: (documentId: number) => void;
  isUploading: boolean;
};

function TopBar({
  documents,
  selectedId,
  onUpload,
  onSelect,
  isUploading,
}: TopBarProps) {
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

      {isUploading && (
        <div>
          <img src={loadingGif} alt="" /> <span>Uploading PDF</span>
        </div>
      )}

      <input
        type="file"
        accept="application/pdf"
        disabled={isUploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = "";
        }}
      />
    </>
  );
}

export default TopBar;
