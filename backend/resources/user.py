from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_refresh_token_required,
    get_jwt_identity,
    jwt_required,
    get_raw_jwt,
    get_jwt_claims,
)
from models.user import UserModel
from flask import request
from blacklist import BLACKLIST

_user_parser_ = reqparse.RequestParser()
_user_parser_.add_argument(
    "email", type=str, required=True, help="email cannot be left blank!"
)
_user_parser_.add_argument(
    "password", type=str, required=True, help="password cannot be left blank!"
)

class UserRegister(Resource):
    @staticmethod
    def post():
        data = _user_parser_.parse_args()

        if UserModel.find_by_email(data["email"]):
            return {"message": "A user with that email already exists!"}, 400

        user = UserModel(**data)
        user.save_to_db()

        return {"message": "User created successfully!"}, 201


class UserLogin(Resource):
    @classmethod
    def post(cls):
        data = request.get_json()
        user = UserModel.find_by_email(data["email"])

        if user and user.check_password(data["password"]):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)
            return {
                       "access_token": access_token,
                       "refresh_token": refresh_token,
                       "user": user.json(),
                   }, 200

        return {"message": "Invalid credentials!"}, 401


class User(Resource):
    @classmethod
    @jwt_required
    def delete(cls, user_id):
        claims = get_jwt_claims()
        if claims["identity"] == user_id:
            user = UserModel.find_by_id(user_id)
            if not user:
                return {"message": "User not found!"}, 404
            user.delete_from_db()
            return {"message": "User deleted!"}, 200
        else:
            return {"message": "User not authorized for this request!"}, 401

    @classmethod
    @jwt_required
    def put(cls, user_id):
        claims = get_jwt_claims()
        if claims["identity"] == user_id:
            user = UserModel.find_by_id(user_id)
            if not user:
                return {"message": "User not found!"}, 404
            data = request.get_json()
            data["email"] = data.get("email", user.email)
            data["password_hash"] = user.set_password(data["password"]) if data.get("password") else user.password_hash
            user.update(data)
            return {"message": "User updated successfully!"}, 200
        else:
            return {"message": "User not authorized for this request!"}, 401


class UserList(Resource):
    @classmethod
    @jwt_required
    def get(cls):
        return {"users": [user.json() for user in UserModel.find_all()]}


class UserLogout(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()["jti"]
        user_id = get_jwt_identity()
        BLACKLIST.add(jti)
        return {"message": f"User {user_id} has been logged out."}, 200


class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {"access_token": new_token}, 200