from functools import wraps
from flask import Flask, json, request, jsonify
import os
from config import ADMIN_EMAIL, DICTATOR_EMAIL, DICTATOR_PASSWORD, MONGO_CLIENT_URL
from pymongo.mongo_client import MongoClient

try:
    from utils.Dictionary import Cambridge
    from utils.ExtraExamples import getExtraExamples
    from utils.Synonyms_Antonyms import getAntonyms, getSynonyms
    from utils.EmailSender import EmailSender
except Exception as e:
    from .utils.ExtraExamples import getExtraExamples
    from .utils.Dictionary import Cambridge
    from .utils.Synonyms_Antonyms import getAntonyms, getSynonyms
    from .utils.EmailSender import EmailSender

import json
from bson import ObjectId, json_util
import logging


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


class JSONDecoder(json.JSONDecoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONDecoder.default(self, o)


emailSender = EmailSender(ADMIN_EMAIL, DICTATOR_EMAIL, DICTATOR_PASSWORD)
app = Flask(__name__)
# app.json_encoder = JSONEncoder
# app.json_decoder = JSONDecoder

client = MongoClient(
    # its Gives us an Error of Auth failed.
    # "mongodb://omar_faruk:Allah_is_1@cluster0.wkp6f.mongodb.net/word_manager?retryWrites=true&w=majority"
    MONGO_CLIENT_URL
)
db = client["word_manager"]
definitionDB = db["word_definitions"]
examplesDB = db["word_examples"]
synonymsDB = db["word_synonyms"]
antonymsDB = db["word_antonyms"]


def print(string, type=logging.DEBUG):
    logging.basicConfig(level=type)
    logging.debug(msg=string)


# def authReq(f):
#     @wraps(f)
#     def checkApiKey(*args, **kwargs):
#         if request.headers.get('X-Auth-Token-Key') != '123321':

#             return jsonify({"message": "Invalid API", "status": 500})
#         return f(*args, **kwargs)
#     return checkApiKey


@app.route('/', methods=['GET'])
def hoom():

    return jsonify({"ok": True})


@app.route('/sendfeedback', methods=['POST'])
def sendfeedback():
    try:
        feedBackData = request.get_data().decode('utf-8')
        feedBackJsonData = json.loads(feedBackData)
        if emailSender is not None:
            mailResp = emailSender.SendMail(
                {**feedBackJsonData, 'logFileName': 'com-dictionary-log.txt#'+str(feedBackJsonData['deviceInfo']['androidId'])+".txt"})
            if mailResp.get('ok'):
                return jsonify({'ok': True})
            else:
                return jsonify({'ok': False, 'error': mailResp.get('error')})
        else:
            print(emailSender)
            return jsonify({'ok': False, 'error': 'Email Send Failed'})

    except Exception as e:
        return jsonify({'ok': False, 'error': str(e.args)})


@app.route('/sendfeedback_attachment', methods=['POST'])
def sendfeedback_attachment():
    logFile = request.files.get('logFile')
    logFile.save(os.path.join('./LogFiles', logFile.filename))
    print(logFile.filename + ' is saved!!!')
    return jsonify({'ok': True})


@app.route('/dictionary', methods=["POST"])
def root():
    try:
        word = request.get_json().get("word")
        print(word)
        wordData = definitionDB.find_one({"word": word.lower()})
        if (wordData):
            print(f"{word} is already in database......")
            print(f"{word}'s Object ID: {wordData['_id']}")
            wordData['_id'] = str(wordData['_id'])
            return {"status": 200, "data": [wordData]}
        else:
            print(f"{word} not in database......")
            cam = Cambridge([word])
            wordData = cam.getMeaning()
            print(wordData)
            if (len(wordData[0]['engType']) == 0):
                return {"status": 200, "data": [{**wordData[0]}]}
            else:
                objectId = definitionDB.insert_one(wordData[0])
                print("ObjectId: ", objectId.inserted_id)
                return {"status": 200, "data": [{"_id": str(objectId.inserted_id), **wordData[0]}]}

    except Exception as e:
        print(e.with_traceback(e))
        return jsonify({"message": "Internal Sever Error", "status": 500, 'error': e.args})


@ app.route('/examples', methods=["POST"])
def exam():
    try:
        word = request.get_json().get('word')
        wordData = examplesDB.find_one({'word': word.lower()})
        if (wordData):
            print(f"{word} is already in examplesDB......")
            wordData['_id'] = str(wordData['_id'])
            return jsonify({"status": 200, "data": [wordData]})
        else:
            wordData = getExtraExamples(word)
            if (len(wordData[0]['examples']) == 0):
                return jsonify({"status": 404, "message": "No Examples Found"})
            obi = examplesDB.insert_one(wordData[0])
            return jsonify({"status": 200, "data": [{**wordData[0], "_id": str(obi.inserted_id)}]})
    except Exception as e:
        return jsonify({"message": "Internal Sever Error", "status": 500, 'error': e.args})


@ app.route('/synonyms', methods=["POST"])
def synonyms():
    print(request.get_json())
    try:
        word = request.get_json().get('word')
        wordData = synonymsDB.find_one({'word': word.lower()})
        if (wordData):
            wordData['_id'] = str(wordData['_id'])
            return jsonify({"status": 200, "data": [wordData]})
        else:
            wordData = {'word': word.lower(), 'nyms': getSynonyms(word)}
            if (len(wordData['nyms']) == 0):
                return jsonify({"status": 404, "message": "No Synonyms Found"})
            obi = synonymsDB.insert_one(wordData)
            return jsonify({"status": 200, "data": [{**wordData, '_id': str(obi.inserted_id)}]})
    except Exception as e:
        print(e.with_traceback(e))
        return jsonify({"message": "Internal Sever Error", "status": 500, 'error': e.args})


@ app.route('/antonyms', methods=["POST"])
def antonyms():
    try:
        word = request.get_json().get('word')
        wordData = antonymsDB.find_one({'word': word.lower()})
        if (wordData):
            wordData['_id'] = str(wordData['_id'])
            return jsonify({"status": 200, "data": [wordData]})
        else:
            wordData = {'word': word.lower(), 'nyms': getAntonyms(word)}
            if (len(wordData['nyms']) == 0):
                return jsonify({"status": 404, "message": "No Antonyms Found"})
            obi = antonymsDB.insert_one(wordData)
            return jsonify({"status": 200, "data": [{**wordData, '_id': str(obi.inserted_id)}]})
    except Exception as e:
        print(e.args)
        return jsonify({"message": "Internal Sever Error", "status": 500, 'error': e.args})


if __name__ == "__main__":
    PORT = os.getenv("PORT")
    print(PORT)
    if PORT == None:
        PORT = 4422
    app.run(port=PORT, debug=True)
