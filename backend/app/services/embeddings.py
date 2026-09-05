from app.config import settings
from together import Together

client = Together(api_key=settings.together_api_key)


def embed_chunks(chunks: list[str]) -> list[list[float]]:
    response = client.embeddings.create(
        model="intfloat/multilingual-e5-large-instruct", input=chunks
    )

    ordered_data = sorted(response.data, key=lambda item: item.index)
    return [item.embedding for item in ordered_data]


INSTRUCTION = "Given a question about a document, retrieve relevant passages that answer the question"


def embed_query(query: str) -> list[float]:
    response = client.embeddings.create(
        model="intfloat/multilingual-e5-large-instruct",
        input=f"Instruct: {INSTRUCTION}\nQuery: {query}",
    )
    return response.data[0].embedding
