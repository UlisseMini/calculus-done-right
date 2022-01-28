from . import models, schemas
from typing import Optional

async def get_user_from_email(email: str) -> Optional[models.User]:
    return await models.User.filter(email=email).first()


async def add_user_from_google(idinfo: dict) -> models.User:
    user = models.User(email=idinfo['email'], name=idinfo['name'], picture=idinfo['picture'])
    await user.save()
    await user.refresh_from_db()
    return user
