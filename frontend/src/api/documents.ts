import { API_URL } from "../config";
import type { DocumentOut } from "../types/api";

export async function uploadDocument(file: File): Promise<DocumentOut> {
  const formData = new FormData();
  formData.append("document", file);

  const response = await fetch(`${API_URL}/documents`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail ?? `Upload failed (${response.status})`);
  }

  return response.json();
}

export async function listDocuments(): Promise<DocumentOut[]> {
  const response = await fetch(`${API_URL}/documents`);

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail ?? `Request failed (${response.status})`);
  }

  return response.json();
}
