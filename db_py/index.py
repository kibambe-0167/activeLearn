
# from flask import  Flask
from flask import Flask, jsonify, request
from flask_cors import CORS
# import database functions
from db import update, insert, readAll

# FLASK_APP=index.py
# $env:FLASK_APP="index.py"
# flask run
app = Flask(__name__)
CORS(app)

# get all data
@app.route("/",)
@app.route("/index", methods=['GET','POST'])
def getAll():
  cors = CORS(app, resources={r"/*": {"origins": '*'}})
  data = readAll()
  if len( data ) > 2:
    return jsonify(data)
  else:
    return jsonify(data)

# add data
@app.route('/edit/', methods=['POST'] )
def updateRoute():
  cors = CORS(app, resources={r"/*": {"origins": '*'}})
  if request.method == 'POST':
    data = request.json 
    print( data )
    result = update( data['id'], data['sentence'], data['sentiment'] )
    if result > 0:
      return jsonify(['Data Updated', 204])
    elif result == False:
      return jsonify(['Error Updating Data', 204])
  else: return jsonify(['post method-wrong', 204])

# add data
@app.route('/add/', methods=['POST'] )
def add():
  cors = CORS(app, resources={r"/*": {"origins": '*'}})
  if request.method == 'POST':
    data = request.json 
    print( data )
    result = insert( data['sentence'], data['sentiment'] )
    if result > 0:
      return jsonify(['Data Added', 204])
    elif result == False:
      return jsonify(['Error Adding Data', 204])
  else: return jsonify(['post method-wrong', 204])