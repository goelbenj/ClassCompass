import os

from flask import Flask
from flask_cors import CORS
from flask_server.utilities.json import CustomJSONProvider
from flask_server.services.user_service import user_service
from flask_server.services.course_card_service import course_card_service


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    # register custom JSONEncoder
    app.json = CustomJSONProvider(app)
    CORS(app)  # TODO: setup origins=[<origin>, ...] for safety
    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    # Register user service
    app.register_blueprint(user_service)
    app.register_blueprint(course_card_service)

    return app
