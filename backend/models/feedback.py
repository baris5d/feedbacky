from typing import Iterable
from typing import NoReturn
from db import db


class FeedbackModel(db.Model):
    __tablename__ = 'feedbacks'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    application_id = db.Column(db.Integer, db.ForeignKey('applications.id'))
    description = db.Column(db.String(200))
    user_agent = db.Column(db.String(200))
    ip_address = db.Column(db.String(200))

    # hash = db.Column(db.String(500), db.ForeignKey('applications.hash'))

    application = db.relationship('ApplicationModel')

    def __init__(self, application_id, description, user_agent, ip_address) -> None:
        # self.hash: int = hash
        self.application_id: int = application_id
        self.description: str = description
        self.user_agent: str = user_agent
        self.ip_address: str = ip_address

    def __repr__(self):
        return '<Feedback %r>' % self.id

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
    def find_by_id(cls, _id: int):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls) -> Iterable:
        return cls.query.all()

    @classmethod
    def find_by_application_id(cls, application_id: int) -> Iterable:
        return cls.query.filter_by(application_id=application_id).all()[::-1]
        
    @classmethod
    def find_by_application_id_and_feedback_id(cls, application_id: int, feedback_id: int):
        return cls.query.filter_by(id=feedback_id, application_id=application_id).first()

    def json(self) -> dict:
        return {
            "id": self.id,
            "description": self.description,
            "application_id": self.application_id,
            "user_agent": self.user_agent,
            "ip": self.ip_address
        }
