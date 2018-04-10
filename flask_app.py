from __future__ import print_function
from flask import Flask,  send_from_directory
import os
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
    url_string = get_json(request.form.get('url'))
    jsonstr = df_decider(url_string)
    result = json.dumps(jsonstr)
    return result


@app.route("/data")
def get_data_url():
    key = request.args.get('key')
    json_data = get_data(key)
    return json_data



if __name__ == "__main__":
    app.run(host='0.0.0.0',port=port,debug=True)
# On Bluemix, get the port number from the environment variable PORT # When running this app on the local machine, default to 8080
