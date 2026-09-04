CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS documents (
    document_id SERIAL PRIMARY KEY,
    file_name TEXT NOT NULL,
    upload_date TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS chunks (
    chunk_id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    embedding VECTOR(1024) NOT NULL,
    document_id INT NOT NULL REFERENCES documents(document_id) ON DELETE CASCADE,
    index INT NOT NULL
);

CREATE INDEX idx_chunks_document_id ON chunks(document_id);
