import os

from dotenv import load_dotenv

load_dotenv()


class Settings:
    database_url = os.getenv("DATABASE_URL")
    together_api_key = os.getenv("TOGETHER_API_KEY")


settings = Settings()
