'''
Quick python script for making a JSON file out of 
a dictionary of course information

Copy and Pasted from 
    https://engineering.calendar.utoronto.ca/search-courses

Ilya S.
'''

import os
import json

#dictionary of courses:
Courses = {
    "ECE159": {
        "title": "Fundamentals of Electric Circuits",
        "description": "Topics include: DC linear circuit elements; DC linear circuit analysis; Kirchhoff's Laws and superposition; Thevenin and Norton equivalents; nodal analysis; operational amplifier; transient response of linear circuits; sinusoidal steady state analysis; phasors; power in AC circuits; frequency response; and resonance phenomena.",
        "term": "Winter"
    },

    "ECE259": {
        'title': "Electromagnetism",
        "description": "The fundamental laws of electromagnetics are covered; including Coulomb's law, Gauss' law, Poisson's and Laplace's equations, the Biot-Savart's law, Ampere's law, Faraday's law, and Maxwell's equations. Vector calculus is applied to determine the relationship between the electric and magnetic fields and their sources (charges and currents). Field-matter interaction is studied, including polarization in dielectric materials and magnetization in magnetic materials. Circuit elements such as the resistor, capacitor and inductor are introduced from an electromagnetic point of view. Other topics include: electric and magnetic forces, the electric potential, capacitance and inductance, electric and magnetic energy, magnetic circuits, boundary-value problems and transmission-lines.",
        "term": "Winter"
    },

    "ECE326": {
        'title': "Programming Languages",
        "description": "Study of programming styles and paradigms. Included are object-oriented scripting functional and logic-based approaches. Languages that support these programming styles will be introduced. Languages treated include Python, Lisp or Scheme and Prolog.",
        "term": "Fall"
    },

    "ECE344": {
        'title': "Operating Systems",
        "description": "Operating system structures, concurrency, synchronization, deadlock, CPU scheduling, memory management, file systems. The laboratory exercises will require implementation of part of an operating system.",
        "term": "Fall and Winter"
    },

    "ECE352": {
        "title": "Computer Organization",
        "description": 'A continuation of some of the topics introduced in ECE253H1. Embedded system design: Input-output and the use of interrupts, peripherals and interfacing. Processor design: pipelining, integer and floating point arithmetic, cache hierarchies and memory organization. Design of combinational and sequential circuits in Verilog.',
        "term": "Fall"
    },

    "ECE421": {
        "title": "Introduction to Machine Learning", 
        "description": "An Introduction to the basic theory, the fundamental algorithms, and the computational toolboxes of machine learning. The focus is on a balanced treatment of the practical and theoretical approaches, along with hands on experience with relevant software packages. Supervised learning methods covered in the course will include: the study of linear models for classification and regression, neural networks and support vector machines. Unsupervised learning methods covered in the course will include: principal component analysis, k-means clustering, and Gaussian mixture models. Theoretical topics will include: bounds on the generalization error, bias-variance tradeoffs and the Vapnik-Chervonenkis (VC) dimension. Techniques to control overfitting, including regularization and validation, will be covered.",
        "term": "Fall and Winter"
    }, 

    'ECE444': {
        "title": "Software Engineering", 
        "description": "The collaborative software development process. Software requirements elicitation and specifications. Software design techniques. Techniques for developing large software systems. Software testing, quality assurance, documentation, and maintenance. Open-source software and web application design.",
        "term": "Fall"
    }

}

def export_courses_to_json(course_dict, filename):
    
    assert filename[-5:].lower() == ".json", "wrong filename extension, must be .json"
    
    dir = os.getcwd()
    
    with open(os.path.join(dir, filename), 'w') as file:
        json.dump(course_dict, file)
    
    print("Succesfully exported JSON file to %s\n", filename)
    #DONE

if __name__ == "__main__": 
    export_courses_to_json(Courses, "courses_static.json")
# END
