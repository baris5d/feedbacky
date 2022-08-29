from flask_jwt_extended import jwt_required, get_jwt_claims
from flask_restful import Resource, reqparse
from models.application import ApplicationModel
from models.feedback import FeedbackModel
from flask import request
from flask_cors import cross_origin

class FeedbackList(Resource):
    @classmethod
    def post(cls, application_token):
        data = request.get_json()
        if not data:
            return {'message': 'No input data provided'}, 400
        feedback = FeedbackModel(token=application_token, description=data["description"], user_agent=request.headers.get('User-Agent'), ip=request.remote_addr)
        feedback.save_to_db()
        return feedback.json(), 201

    @classmethod
    def get(self, application_id):
        return {'feedbacks': [feedback.json() for feedback in FeedbackModel.find_by_application_id(application_id)]}

class Feedback(Resource):
    @classmethod
    def get(self, application_id, feedback_id):
        return FeedbackModel.find_by_application_id_and_feedback_id(application_id,feedback_id).json()

    @classmethod
    def delete(self, application_id, feedback_id):
        feedback = FeedbackModel.find_by_application_id_and_feedback_id(application_id,feedback_id)
        if not feedback:
            return {'message': 'Feedback not found'}, 404
        feedback.delete_from_db()
        return {}, 200

class FeedbackAdd(Resource):
    @classmethod
    @cross_origin(origin='*')
    def post(cls, application_token):
        data = request.get_json()
        if not data:
            return {'message': 'No input data provided'}, 400
        application = ApplicationModel.find_by_token(application_token)
        if not application:
            return {'message': 'No application found'}, 400
        feedback = FeedbackModel(application_id=application.id, description=data["description"], user_agent=request.headers.get('User-Agent'), ip_address=request.remote_addr)
        feedback.save_to_db()
        return feedback.json(), 201
