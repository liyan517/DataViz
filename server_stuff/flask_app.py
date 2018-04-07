from __future__ import print_function
from flask import Flask, Response, jsonify
from flask_restplus import Api, Resource, fields, reqparse 
from flask_cors import CORS, cross_origin
import pandas as pd
import os 
import sys


# the app 
app = Flask(__name__) 
CORS(app) 
api = Api(app, version='1.0', title='APIs for Python Functions', validate=False)
ns = api.namespace('Arbitrary Function', 'Does stuff') 

# load the algo 
from fortune_cookie import fortune as algo 

''' We import our function `Erasosthenes` from the file prime_sieve.py. You create all the classes and functions that you want in that file, and import them into the app. ''' 

# model the input data 
model_input = api.model('Enter the cookie wanted:', { "cookie_index": fields.Integer(maximum=10e16)}) 

# the input data type here is Integer. You can change this to whatever works for your app. 

# On Bluemix, get the port number from the environment variable PORT # When running this app on the local machine, default to 8080 

port = int(os.getenv('PORT', 8080)) 

# The ENDPOINT 
@ns.route('/foo') 

# the endpoint 
class foo(Resource): 
    @api.response(200, "Success", model_input)   
    @api.expect(model_input)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('cookie_index', type=int)
        args = parser.parse_args()
        inp = int(args["cookie_index"]) 
        result = algo(inp) 
        return jsonify({"result": result}) 


# model the input data 
model2_input = api.model('Enter the url wanted:', { "url": fields.String()}) 

from fortune_cookie import get_json 
from fortune_cookie import df_decider

# The ENDPOINT 
@ns.route('/jsonfinder') 

# the endpoint 
class jsonfinder(Resource): 
    @api.response(200, "Success", model2_input)   
    @api.expect(model2_input)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('url', type=str)
        args = parser.parse_args()
        inp = str(args["url"]) 
        result = get_json(inp)
        # print(pd.read_json(result))
        # print(result, file=sys.stderr)

        # return jsonify({"result": result})
        return jsonify(df_decider(result))

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=port, debug=True)
