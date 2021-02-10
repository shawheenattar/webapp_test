# import json
# from flask import Flask, request
# from flask import make_response, abort
# from flask_cors import CORS
# from face.recognize_faces_image import ImageRecognizer

# app = Flask(__name__)
# CORS(app)

# @app.errorhandler(404)
# def not_found(error):
#     return make_response({'error': 'Not found'}, 404)

# # NOTE: This route is needed for the default EB health check route
# @app.route('/')
# def home():
#     return "ok"
    
# @app.route('/api/face', methods=['PUT'])
# def get_confirmation():
#     if not request.json or not 'uri' in request.json:
#         abort(400)
#     data_uri = request.json['uri']
#     i = ImageRecognizer
 
#     recognized_faces = i.recognize_face(data_uri)
#     # if (len(recognized_faces) > 0):
#     #     for face in recognized_faces:
#     #         print(face)
#     return {'users': recognized_faces}

# if __name__ == '__main__':
#     app.run(port=8080)

import json
from flask import Flask, request, abort
from flask_cors import CORS
from face.recognize_faces_image import ImageRecognizer

app = Flask(__name__)
CORS(app)

# NOTE: This route is needed for the default EB health check route
@app.route('/')
def home():
    return "ok"

@app.route('/api/get_topics')
def get_topics():
    return {"topics": ["topic1", "other stuff", "next topic"]}

@app.route('/api/submit_question', methods=["POST"])
def submit_question():
    question = json.loads(request.data)["question"]
    return {"answer": f"You Q was {len(question)} chars long"}

@app.route('/api/face', methods=['POST'])
def get_confirmation():
    # if not request.json or not 'uri' in request.json:
    #     abort(400)
    # data_uri = request.json['uri']
    # i = ImageRecognizer
 
    # recognized_faces = i.recognize_face(data_uri)
    # # if (len(recognized_faces) > 0):
    # #     for face in recognized_faces:
    # #         print(face)
    # return {'users': recognized_faces}
    return {"users": ["ok"]}
    
if __name__ == '__main__':
    app.run(port=8080)