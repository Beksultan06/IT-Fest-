from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.environ.get("SECRET_KEY")

NAME = os.getenv('DB_NAME')
USER = os.getenv('DB_USER')
PASSWORD = os.getenv('DB_PASS')
PORT = os.getenv('DB_PORT')
HOST = os.getenv('DB_HOST')