from flask_server.classes.course_card import CourseCard, COURSE_CARD_FIELDS
from flask_server import create_app
import pytest
import json
import os


# Pytest fixture
@pytest.fixture
def test_client():
    app = create_app()
    app.config["TESTING"] = True
    client = app.test_client()
    yield client

def test_valid_get_all_courses(test_client):
    # Load golden data. Currently return data is the same as source data
    file_path = os.path.join('src', 'flask_server', 'clients', 'courses_static.json')
    with open(file_path) as f:
        golden_data = json.load(f)
    
    # call /course-card-service/get-all
    response = test_client.get("/course-card-service/get-all")
    
    # ensure the response status code is 200 (OK)
    assert response.status_code == 200
    
    # parse the JSON response
    data = json.loads(response.data)

    # Check if the all of the fields in the JSON response match the expected values
    for(key, value) in golden_data.items():
        value['course_code'] = key
        assert data[key] == value


def test_valid_get_course_card(test_client):
    # Load golden data. Currently return data is the same as source data
    file_path = os.path.join('src', 'flask_server', 'clients', 'courses_static.json')
    with open(file_path) as f:
        all_courses = json.load(f)
    
    # call /course-card-service/<course_code>
    response = test_client.get("/course-card-service/ECE159")
    
    # ensure the response status code is 200 (OK)
    assert response.status_code == 200
    
    # parse the JSON response
    data = json.loads(response.data)
    golden_data = all_courses['ECE159']
    golden_data['course_code'] = 'ECE159'

    # Check if all of the fields in the JSON response match the expected values
    assert data == golden_data

    # test for a course that does not exist
    response = test_client.get("/course-card-service/INVALID")
    
    assert response.status_code == 404

def test_valid_filter_courses(test_client):
    # Load golden data. Currently return data is the same as source data
    file_path = os.path.join('src', 'flask_server', 'clients', 'courses_static.json')
    with open(file_path) as f:
        all_courses = json.load(f)
    
    # call /course-card-service/filter
    response = test_client.get("/course-card-service/filter", json={"stringQuery": "ECE"})
    assert response.status_code == 200
    data = json.loads(response.data)
    # Check if all of the fields in the JSON response match the expected values
    for key, value in data.items():
        assert key in all_courses
        all_courses[key]['course_code'] = key
        assert value == all_courses[key]
    
    # test for a query with a string and a term
    response = test_client.get("/course-card-service/filter", json={"stringQuery": "Electric Circuits", "term": "Fall"})
    assert response.status_code == 200
    data = json.loads(response.data)
    # Check if all of the fields in the JSON response match the expected values
    for key, value in data.items():
        assert key in all_courses
        all_courses[key]['course_code'] = key
        assert value == all_courses[key]
        assert value['term'] == "Fall"

    # test for a course that does not exist
    response = test_client.get("/course-card-service/filter", json={"stringQuery": "INVALID"})
    
    assert response.status_code == 200
    assert response.data == b'{}'

    # test for a course that does not exist
    response = test_client.get("/course-card-service/filter", json={"stringQuery": 123})
    
    assert response.status_code == 400