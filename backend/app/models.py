from tortoise.models import Model
from tortoise import fields

class User(Model):
    id = fields.IntField(pk=True)
    email = fields.CharField(max_length=100, unique=True)
    name = fields.TextField()
    picture = fields.TextField() # url to profile picture
    is_active = fields.BooleanField(default=True) # so I can ban users

