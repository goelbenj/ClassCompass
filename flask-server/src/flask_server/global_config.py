import os
from dotenv import load_dotenv
from flask_server.clients.database_client import DataBaseClient

# Load environment variables
load_dotenv()

# Instantiate the DB
# Authenticate credentials so we can access our firebase project
json_path = "classcompass-firebase-adminsdk.json"
db_client = DataBaseClient(json_path)
