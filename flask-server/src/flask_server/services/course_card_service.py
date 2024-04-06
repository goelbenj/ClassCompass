from flask import Blueprint, abort, request
from flask_server.classes.course_card import CourseCard
from werkzeug.exceptions import BadRequest, NotFound, Forbidden
from flask import current_app
import json
import os
from flask_server.utilities.search import textSearch

course_card_service = Blueprint('course_card_service', __name__, template_folder='templates',
                          url_prefix='/course-card-service')

# TODO: Sync the return format with the frontend
@course_card_service.route('/get-all')
def getAllCourses():
    '''Return all courses available'''

    base_dir = os.path.dirname(current_app.root_path)
    file_path = os.path.join(base_dir, 'flask_server', 'clients', 'courses_static.json')
    all_courses_data = dict()

    with open(file_path) as f:
        all_courses = json.load(f)
    
    # Check that all required fields exist
    for key, value in all_courses.items():
        value['course_code'] = key
        course = CourseCard.from_json(value)
        all_courses_data[key] = course.to_json()

    return all_courses_data, 200

@course_card_service.route('/<course_code>')
def getCourseCard(course_code):
    '''Given a course code, return the corresponding CourseCard to it'''

    base_dir = os.path.dirname(current_app.root_path)
    file_path = os.path.join(base_dir, 'flask_server', 'clients', 'courses_static.json')
    with open(file_path) as f:
        all_courses = json.load(f)

    try:
        if (course := all_courses.get(course_code)) == None:
            raise KeyError
    except KeyError:
        abort(NotFound.code)
    
    course['course_code'] = course_code
    course_data = CourseCard.from_json(course).to_json()

    return course_data, 200

# data should contain {stringQuery: str}
#   optionally {term: str, class_time: str, rating: int, tags: List[str]}
@course_card_service.route('/filter', methods=['POST'])
def filterCourses():
    '''Filter courses based on the given parameters'''
    data = request.json
    query = data['stringQuery']
    
    if query == None:
        raise BadRequest("stringQuery is required in the request body")
    elif not isinstance(query, str):
        raise BadRequest("stringQuery must be a string")

    base_dir = os.path.dirname(current_app.root_path)
    file_path = os.path.join(base_dir, 'flask_server', 'clients', 'courses_static.json')

    with open(file_path) as f:
        all_courses = json.load(f)

    if not query == "":
        courses_combined = {course_code: f"{course_code} {course['title']} {course['description']}" for course_code, course in all_courses.items()}
        course_codes = textSearch(courses_combined, query, limit=30, match_threshold=50)
    else:
        course_codes = all_courses.keys()

    if 'term' in data:
        term = data['term']
        if not isinstance(term, str):
            raise BadRequest("term must be a string")
        course_codes = [course_code for course_code in course_codes if all_courses[course_code]['term'] == term]
    
    filtered_courses = dict()
    for course_code in course_codes:
        course = all_courses[course_code]
        course['course_code'] = course_code
        course_data = CourseCard.from_json(course).to_json()
        filtered_courses[course_code] = course_data

    return filtered_courses, 200