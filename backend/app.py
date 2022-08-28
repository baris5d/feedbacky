from resources.feedback import Feedback, FeedbackList, FeedbackAdd
from resources.application import Application, ApplicationList, ApplicationFind
from logging.handlers import TimedRotatingFileHandler
from flask_jwt_extended import JWTManager
from models.user import UserModel
from flask import Flask, jsonify
from blacklist import BLACKLIST
from datetime import timedelta
from dotenv import load_dotenv
from flask_restful import Api
from resources.user import (
    User,
    UserLogin,
    UserLogout,
    UserRegister,
    TokenRefresh,
)
from flask_cors import CORS
from datetime import date
import logging
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config["APPLICATION_ROOT"] = "/api/v1"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=8)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=3)

app.secret_key = os.getenv("API_SECRET_KEY")

api = Api(app)


@app.before_first_request
def create_tables():
    db.create_all()
    admin_user = UserModel.find_by_id(1)
    if not admin_user:
        user = UserModel(
            password=os.getenv("ADMIN_PASSWORD"),
            email=os.getenv("ADMIN_EMAIL")
        )
        user.save_to_db()

jwt = JWTManager(app)


@jwt.user_claims_loader
def add_claims_to_jwt(identity):
    user_information = {
        "identity": identity
    }

    return user_information

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    return decrypted_token["jti"] in BLACKLIST

api.add_resource(UserRegister, "/api/v1/register")
api.add_resource(User, "/api/v1/user/<int:user_id>")
api.add_resource(UserLogin, "/api/v1/login")
api.add_resource(UserLogout, "/api/v1/logout")
api.add_resource(TokenRefresh, "/api/v1/refresh")
api.add_resource(Application, "/api/v1/applications/<int:id>")
api.add_resource(ApplicationList, "/api/v1/applications")
api.add_resource(ApplicationFind, "/api/v1/applications/check/<string:hash>")
api.add_resource(Feedback, "/api/v1/applications/<int:application_id>/feedbacks/<int:feedback_id>")
api.add_resource(FeedbackList, "/api/v1/applications/<int:application_id>/feedbacks")
api.add_resource(FeedbackAdd, "/api/v1/feedbacks/<string:application_hash>")

if __name__ == "__main__":
    from db import db

    db.init_app(app)
    app.run(host=os.getenv("HOST"), port=int(os.getenv("PORT")), threaded=True, debug=os.getenv("DEBUG_MODE"))