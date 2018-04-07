from __future__ import print_function
from flask import Flask, Response, jsonify, send_from_directory
from flask_restplus import Api, Resource, fields, reqparse 
from flask_cors import CORS, cross_origin
import pandas as pd
import os 
import sys
from flask import render_template
import json
from flask import request
from fortune_cookie import get_json, df_decider
from db_interactions import get_data

app = Flask(__name__)

port = int(os.getenv('PORT', 8080))

@app.route("/")
def index():
    return render_template("index1.html")

@app.route('/static/<path:path>')
def send_js(path):
    return send_from_directory('static', path)




@app.route("/app")
def app_route():
    return render_template("index.html")


@app.route("/postdata", methods=['POST'])
def post_data():
    print("post " + request.form.get('url'))
    print(request.form.get('url'))
    url_string = get_json(request.form.get('url'))
    jsonstr = df_decider(url_string)
    result = json.dumps(jsonstr)
    print("THIS IS RESULT")
    print(result)
    return result
    # return json.dumps(result)


@app.route("/data")
def get_data_url():
    key = request.args.get('key')
    print(key)
    json_data = get_data(key)
    print("JSON DATA START")
    print(json_data)
    print("JSON DATA END")
    return json_data



if __name__ == "__main__":
    app.run(host='0.0.0.0',port=port,debug=True)
# On Bluemix, get the port number from the environment variable PORT # When running this app on the local machine, default to 8080
