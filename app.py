from flask import Flask, send_from_directory
from flask import render_template
import json
from flask import request
from bson.json_util import dumps
import pandas as pd

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'donorschoose'
COLLECTION_NAME = 'projects'
FIELDS = {'school_state': True, 'resource_type': True, 'poverty_level': True, 'date_posted': True, 'total_donations': True, '_id': False}


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
    result = {"charts": [{"dim": "type_of_course", "chart": "bar", "title": "time against net_bal_amt"}, {"dim": "year", "chart": "pie", "title": "time against net_bal_amt"}], "measure": "count"}
    return json.dumps(result)


@app.route("/data")
def get_data():
    df = pd.read_csv("static/test/test.csv")
    data = json.loads(df.reset_index().to_json(orient='records'))
    result = {}
    result['data'] = data
    json_data = json.dumps(result, default=json_util.default)
    return json_data



if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True)