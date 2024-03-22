from flask_server.classes.common import ClassField, DataField

COURSE_CARD_FIELDS = DataField([
    ClassField("course_code"),
    ClassField("title"),
    ClassField("description"),
    ClassField("term"),
])

class CourseCard:
    """Course Card class"""

    def __init__(self, course_code, title, description, term):
        self.course_code: str = course_code
        self.title: str = title
        self.description: str = description
        self.term: str = term

    @classmethod
    def from_json(cls, json):
        # check that all required fields exist. Ignore extra kwargs
        course_instance = cls(**{k: v for k, v in json.items() if k in COURSE_CARD_FIELDS})

        for key, value in json.items():
            if key in COURSE_CARD_FIELDS:
                factory_func = COURSE_CARD_FIELDS.factory_funcs(key)
                value = factory_func(value)
                setattr(course_instance, key, value)

        return course_instance

    def to_json(self):
        course_json = {}

        for field_name in COURSE_CARD_FIELDS:
            event_value = eval(f"self.{field_name}")
            if event_value is not None:
                json_factory_func = COURSE_CARD_FIELDS.json_factory_funcs(field_name)
                course_json[field_name] = json_factory_func(event_value)

        return course_json