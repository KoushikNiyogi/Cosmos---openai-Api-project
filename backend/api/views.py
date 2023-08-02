from flask_restful import Resource, reqparse, request
from datetime import datetime
from . import api, db
from .models import Tokens, token_required, generate_token, time_stamp_verifier, validate_headers
from app import query_builder, get_response

class GetToken(Resource):
    """
    Generates a token or returns the existing live token.
    Requires an email in the request's header.
    """
    method_decorators = [validate_headers]
    def post(self):

        curr_email = request.headers.get("email")
        current_user = Tokens.query.filter_by(email=curr_email).first()
        
        if current_user and not time_stamp_verifier(current_user.created_at):
            return({"Error": f"You already have an active token: {current_user.token}"})
            
        elif current_user:
            current_user.token = generate_token(current_user.email)
            current_user.created_at = datetime.utcnow()
            db.session.commit()
            
            return {"TOKEN GENERATED": f"{current_user.token}"}
        
        else:
            new_token = generate_token(curr_email)
            new_user = Tokens(
                email = curr_email,
                token = new_token
            )
            
            db.session.add(new_user)
            db.session.commit()

            return {"TOKEN GENERATED": f"{new_token}"}

class QueryBuilder(Resource):
    """
    API endpoint to use the query_builder function from the app.
    Requires email and token in the header.
    """
    
    method_decorators = [token_required, validate_headers]
    
    def post(current_user):
    
        parser = reqparse.RequestParser()
        parser.add_argument("query")
        
        body = parser.parse_args()
        
        query = body.get("query")
        
        if not query or type(query) != str:
            return {"Error": "Your request didn't have a valid query in the payload."}

        current_user.call_count = current_user.call_count + 1
        db.session.commit()
        
        return query_builder(query)

class GetResponse(Resource):
    """
    API endpoint to use the get_response function from the app.
    Requires email and token in the header.
    """
    
    method_decorators = [token_required, validate_headers]
    
    def post(current_user):
    
        parser = reqparse.RequestParser()
        parser.add_argument("query")
        
        body = parser.parse_args()
        
        query = body.get("query")
        
        if not query or type(query) != str:
            return {"Error": "Your request didn't have a valid query in the payload."}
        
        current_user.call_count = current_user.call_count + 1
        db.session.commit()
    
        return get_response(query)

"""
Create and add endpoints to the app's API
"""

api.add_resource(GetToken, "/token")
api.add_resource(QueryBuilder, "/query")
api.add_resource(GetResponse, "/response")