from app.config import settings
from psycopg2.extras import RealDictRow
from together import Together

client = Together(api_key=settings.together_api_key)

CHAT_MODEL = "openai/gpt-oss-20b"

SYSTEM_INSTRUCTIONS = """Your task is to answer questions about a document using only the content provided below.\nIf the content does not contain enough information to answer the question, say that the document doesn't cover it. Do not use outside knowledge and do not guess."""


def build_prompt(query: str, chunks: list[str]) -> list[dict[str, str]]:
    sources = ""
    for i in range(len(chunks)):
        sources += f"[Source {i + 1}]\n{chunks[i]}\n\n"

    system_message = f"{SYSTEM_INSTRUCTIONS}\n\nContext:\n\n{sources}"

    return [
        {"role": "system", "content": system_message},
        {"role": "user", "content": query},
    ]


def generate_answer(query: str, chunks: list[RealDictRow]) -> str:
    chunks_content = [chunk["content"] for chunk in chunks]

    response = client.chat.completions.create(
        model=CHAT_MODEL,
        messages=build_prompt(query, chunks_content),  # type: ignore
    )

    answer = response.choices[0].message

    if answer is None or answer.content is None:
        raise RuntimeError("Chat model failed to return content.")

    return answer.content
