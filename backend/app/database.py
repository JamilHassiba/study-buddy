from pgvector.psycopg2 import register_vector
from psycopg2 import pool

from .config import settings

connection_pool = pool.ThreadedConnectionPool(
    minconn=1, maxconn=10, dsn=settings.database_url
)


def get_db():
    conn = connection_pool.getconn()
    try:
        register_vector(conn)
        yield conn
    except Exception:
        conn.rollback()
        raise
    finally:
        connection_pool.putconn(conn)
