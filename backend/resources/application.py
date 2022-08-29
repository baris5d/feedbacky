# Resource for building
from email.mime import application
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_claims
from models.application import ApplicationModel
from models.user import UserModel
from flask import request

_application_parser_ = reqparse.RequestParser()
_application_parser_.add_argument(
    "user_id", type=int, required=True, help="user_id cannot be left blank!"
)


class Application(Resource):
    @classmethod
    def get(cls, id):
        print("test")
        application = ApplicationModel.find_by_id(id)
        if application:
            return application.json()
        return {'message': 'Application not found'}, 404

    @classmethod
    @jwt_required
    def put(cls, id):
        data = request.get_json()
        user_id = get_jwt_claims()["identity"]
        user = UserModel.find_by_id(user_id)
        if not user:
            return {"message": "User not found!"}, 404
        if not data:
            return {'message': 'No input data provided'}, 400

        application = ApplicationModel.find_by_id(id)
        data["name"] = data.get("name", application.name)
        application.update(data)
        return application.json(), 201

    @classmethod
    @jwt_required
    def delete(cls, id):
        user_id = get_jwt_claims()["identity"]
        user = UserModel.find_by_id(user_id)
        if not user:
            return {"message": "User not found!"}, 404

        application = ApplicationModel.find_by_id(id)
        if application:
            application.delete_from_db()
        return {}, 200

class ApplicationList(Resource):
    @classmethod
    @jwt_required
    def get(cls):
        id = get_jwt_claims()["identity"]
        user = UserModel.find_by_id(id)
        if not user:
            return {"message": "User not found!"}, 404
        
        applications = ApplicationModel.find_by_user_id(id)
        if application:
            return {
                'applications': [a.json() for a in applications]}
        return {'message': 'Application not found'}, 404

    @classmethod
    @jwt_required
    def post(cls):
        data = request.get_json()
        id = get_jwt_claims()["identity"]
        user = UserModel.find_by_id(id)
        if not user:
            return {"message": "User not found!"}, 404
        if not data:
            return {'message': 'No input data provided'}, 400

        application = ApplicationModel(name=data["name"], user_id=id)
        application.save_to_db()
        return application.json(), 201


class ApplicationFind(Resource):
    @classmethod
    def get(cls, token):
        application = ApplicationModel.find_by_token(token)
        if application:
            return {'message': 'Application found!'}, 200
        return {'message': 'Application not found'}, 404
