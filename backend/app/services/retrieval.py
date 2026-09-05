from psycopg2.extras import RealDictCursor, RealDictRow


def retrieve_chunks(
    cursor: RealDictCursor,
    document_id: int,
    query_embedding: list[float],
    limit: int = 5,
) -> list[RealDictRow]:

    query = """
        SELECT 
            content, 
            index, 
            embedding <=> %s::vector AS distance
        FROM chunks 
        WHERE document_id = %s 
        ORDER BY distance 
        LIMIT %s;
    """
    data = (query_embedding, document_id, limit)

    cursor.execute(query, data)
    return cursor.fetchall()
