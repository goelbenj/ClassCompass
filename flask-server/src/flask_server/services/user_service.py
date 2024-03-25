from flask import Blueprint, abort, current_app, request
from flask_server.classes.user_profile import UserProfile
from flask_server.global_config import db_client
from google.api_core.exceptions import NotFound as FirestoreNotFound
from google.cloud import firestore
import json
import os
from werkzeug.exceptions import BadRequest, NotFound, Forbidden


user_service = Blueprint('user_service', __name__, template_folder='templates',
                          url_prefix='/user-service')

@user_service.route('/<user_id>')
def getUserProfile(user_id):
    '''Given an user_id, return the corresponding UserProfile to it'''

    # get reference to user profiles collection
    user_profiles_collection_ref = db_client.user_profiles_collection

    # get doc reference
    user_profiles_doc_ref = user_profiles_collection_ref.document(user_id)

    # Get the data of the event document
    user_profile = user_profiles_doc_ref.get().to_dict()

    if not user_profile:
        # error if no user profile exists
        abort(NotFound.code)

    return user_profile, 200


@user_service.route('/create-profile', methods=['POST'])
def createUserProfile():
    data = request.json

    # check that all required fields exist and no extra fields exist
    try:
        user_profile = UserProfile.from_json(data)
    except TypeError as type_error:
        abort(BadRequest.code)

    # get uid for indexing
    uid = data.get('uid')

    # get reference to user profiles collection
    user_profiles_collection_ref = db_client.user_profiles_collection

    # if user profile exists, error 403
    if user_profiles_collection_ref.document(uid).get().exists:
        abort(Forbidden.code)

    # Retrieve the json back from our obj
    user_profile_data = user_profile.to_json()

    # Add the user profile data to the Firestore "UserProfiles" collection
    user_profiles_collection_ref.document(uid).set(user_profile_data)
    return user_profile_data, 201


@user_service.route('/edit-profile', methods=['PUT'])
def editUserProfile():
    data = request.json

    # abort 400 if no uid is passed in body
    if (uid := data.get('uid')) is None:
        abort(BadRequest.code)

    # abort 400 if no display_name is passed in body
    if (display_name := data.get('display_name')) is None:
        abort(BadRequest.code)

    # abort 400 if no photo_url is passed in body
    if (photo_url := data.get('photo_url')) is None:
        abort(BadRequest.code)

    # get reference to user profiles collection
    user_profiles_collection_ref = db_client.user_profiles_collection

    # abort 404 if the announcement does not exist
    try:
        doc_ref = user_profiles_collection_ref.document(uid)
        # update description
        doc_ref.update({'display_name': display_name, 'photo_url': photo_url})
    except FirestoreNotFound:
        abort(NotFound.code)

    return "", 204


@user_service.route('/add-course', methods=['PUT'])
def add_course():
    '''
    Adds a course by course code to the user profile's `courses` list pointed
    to by the `uid`. If the course code already exists, the course is removed.
    '''
    data = request.json

    # abort 400 if no uid is passed in body
    if (uid := data.get('uid')) is None:
        abort(BadRequest.code)

    # abort 400 if no course code is passed in body
    if (course_code := data.get('course_code')) is None:
        abort(BadRequest.code)

    # Perform class code check
    base_dir = os.path.dirname(current_app.root_path)
    file_path = os.path.join(base_dir, 'flask_server', 'clients', 'courses_static.json')
    with open(file_path) as f:
        all_courses = json.load(f)

    if (all_courses.get(course_code)) == None:
        abort(NotFound.code)

    # get reference to user profiles collection
    user_profiles_collection_ref = db_client.user_profiles_collection

    # abort 404 if the announcement does not exist
    try:
        doc_ref = user_profiles_collection_ref.document(uid)
        # update profile
        profile_courses = doc_ref.get().to_dict().get('courses', [])
        if (course_code in profile_courses):
            # remove course
            doc_ref.update({'courses': firestore.ArrayRemove([course_code])})
        else:
            # add course
            doc_ref.update({'courses': firestore.ArrayUnion([course_code])})
    except FirestoreNotFound:
        abort(NotFound.code)

    return [1,2,3], 204
