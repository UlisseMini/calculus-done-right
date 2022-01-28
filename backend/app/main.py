from fastapi import FastAPI, Depends
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import HTTPException
from . import schemas, models, crud
from tortoise import Tortoise
from .config import DATABASE_URL, GOOGLE_CLIENT_ID

from google.oauth2 import _id_token_async
from google.auth.transport import _aiohttp_requests
from . import google_monkey
import aiohttp

app = FastAPI()

origins = [
    'https://calculus-done-right.com',
    'https://calculus-done-right.pages.dev',
    'http://localhost:3000',
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.on_event('startup')
async def startup():
    await Tortoise.init(
        db_url=DATABASE_URL,
        modules={'models': ['app.models']},
    )
    await Tortoise.generate_schemas()


@app.on_event('shutdown')
async def shutdown():
    await Tortoise.close_connections()


@app.post("/google-signin")
async def google_signin(signin: schemas.GoogleSignin):
    async with aiohttp.ClientSession(auto_decompress=False) as session:
        try:
            idinfo = await _id_token_async.verify_oauth2_token(
                signin.token,
                _aiohttp_requests.Request(session),
                GOOGLE_CLIENT_ID,
            )
            print(idinfo)
        except ValueError as e:
            print(e)
            raise HTTPException(status_code=400, detail='Invalid token')

    if user := await crud.get_user_from_email(idinfo['email']):
        print(f'{idinfo["email"]} is already in db')
    else:
        print(f'{idinfo["email"]} is not in db, adding...')
        await crud.add_user_from_google(idinfo)

    return 'ok'


@app.get("/")
async def index():
    return RedirectResponse('https://calculus-done-right.com')
