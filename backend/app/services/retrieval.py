from psycopg2.extras import RealDictCursor, RealDictRow


def retrieve_chunks(
    cursor: RealDictCursor,
    document_id: int,
    query_embedding: list[float],
    limit: int = 5,
) -> list[RealDictRow]:

    query = """
        SELECT content, index
        FROM chunks 
        WHERE document_id = %s 
        ORDER BY embedding <=> %s::vector 
        LIMIT %s;
    """
    data = (document_id, query_embedding, limit)

    cursor.execute(query, data)
    return cursor.fetchall()
