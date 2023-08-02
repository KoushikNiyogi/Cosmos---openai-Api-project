from . import db, SECRET_KEY, TOKEN_TIMER
from flask_restful import request
from itsdangerous.url_safe import URLSafeTimedSerializer as Serializer
from functools import wraps
from datetime import datetime, timedelta
from sqlalchemy.sql import func
from email_validator import validate_email, EmailNotValidError

class Tokens(db.Model):
    """
    SQL Database Schema
    """
    email = db.Column(db.String(120), primary_key=True, unique=True, nullable=False)
    token = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    call_count = db.Column(db.Integer, default=0)

    
"""
Token Generator and a wrapper to authenticate it. Generates a 30 minute token to be used as authentication for high level security endpoints. 
"""
def generate_token(email):
    serializer = Serializer(SECRET_KEY)
    return serializer.dumps({"email": email})

def token_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")
        if token:
            try: 
                serializer = Serializer(SECRET_KEY)
                decoded_token = serializer.loads(token)
                current_user = Tokens.query.filter_by(email=decoded_token["email"]).first()
                if not current_user:
                    return {"Error": "User not found!"}, 401
                if not time_stamp_verifier(current_user.created_at):
                    return({"Error": "Your token has expired, please request a new one."}), 403
            except Exception as error:
                return {error : "Access Token is invalid!"}, 401    
        else:
            return {"Error" : "Access Token is missing from your request!"}, 401
        

        return func(current_user, *args, **kwargs)
    
    return wrapper

def is_valid_email(email):
    """Validates an email's syntax

    Args:
        email (str)

    Returns:
        bool: True if email is valid, else False
    """
    try:
        validate_email(email)
        return True
    except EmailNotValidError:
        return False

def validate_headers(func):
    """Wrapper to validate request header.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        curr_email = request.headers.get("email")
        if not curr_email:
            return({"Error": "Please include an email in your request's header "}), 401
        if not is_valid_email(curr_email):
            return({"Error": f"The email provided is not valid: {curr_email}"}), 401
        
        return func(*args, **kwargs)
    return wrapper

def time_stamp_verifier(time_stamp_at_creation):
    curr_time  = datetime.utcnow()
    
    return curr_time < time_stamp_at_creation + timedelta(minutes=TOKEN_TIMER)

