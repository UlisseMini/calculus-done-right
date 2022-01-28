from pydantic import BaseModel

class JWTSignin(BaseModel):
    token: str


class GoogleSignin(JWTSignin):
    pass

