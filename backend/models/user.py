from __future__ import annotations
from werkzeug.security import generate_password_hash, check_password_hash
from typing import NoReturn
from db import db


class UserModel(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(100))
    password_hash = db.Column(db.String(200))

    def __init__(self, password, email) -> None:
        self.password_hash: str = generate_password_hash(password)
        self.email: str = email

    def __repr__(self) -> str:
        return "<User %r>" % self.email

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)

    def json(self) -> dict:
        return {
            "id": self.id,
            "email": self.email
        }

    def save_to_db(self) -> NoReturn:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> NoReturn:
        db.session.delete(self)
        db.session.commit()

    def update(self, data: dict) -> NoReturn:
        for key, value in data.items():
            setattr(self, key, value)
        db.session.commit()

    @classmethod
    def find_by_email(cls, email: str):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls):
        return cls.query.all()
