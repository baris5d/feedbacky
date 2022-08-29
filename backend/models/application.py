from typing import NoReturn
from db import db
import uuid



class ApplicationModel(db.Model):
    __tablename__ = 'applications'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(80), nullable=False)
    token = db.Column(db.String(80), nullable=False)


    user = db.relationship('UserModel')

    def __init__(self, user_id, name) -> None:
        self.user_id: str = user_id
        self.name: str = name
        self.token: str = self.generate_hash()

    def __repr__(self):
        return '<Application %r>' % self.id

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, data: dict) -> NoReturn:
        for key, value in data.items():
            setattr(self, key, value)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()

    @classmethod
    def find_by_token(cls, token):
        return cls.query.filter_by(token=token).first()

    def generate_hash(cls):
        return uuid.uuid4().hex

    def json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "token": self.token
        }
