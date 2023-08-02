from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import dotenv
import pymysql

dotenv.load_dotenv("env_variables.env")
sql_admin = os.getenv("SQL_USER")
sql_password = os.getenv("SQL_PASS")
sql_db = os.getenv("SQL_DB")
SECRET_KEY = os.getenv("SECRET_KEY")
TOKEN_TIMER = os.getenv("TOKEN_TIMER_MINUTES")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{sql_admin}:{sql_password}@localhost/{sql_db}"
app.config["SECRET_KEY"] = SECRET_KEY

CORS(app,origins=["*"])
db = SQLAlchemy(app)
api = Api(app)

from api import views 