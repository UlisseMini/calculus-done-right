from dotenv import load_dotenv
load_dotenv()

import os

# I use os.getenv for defaults, and environ to crash when not envvar does not exist

POSTGRES_USER = os.getenv('POSTGRES_USER', 'postgres')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'postgres')
POSTGRES_DB = os.getenv('POSTGRES_DB', 'postgres')
GOOGLE_CLIENT_ID = os.environ['GOOGLE_CLIENT_ID']

DATABASE_URL = f'postgres://{POSTGRES_USER}:{POSTGRES_PASSWORD}@127.0.0.1/{POSTGRES_DB}'
