from flask import Flask, jsonify
from flask_restful import Resource, Api, abort, reqparse, fields, marshal_with
from flask_mongoengine import MongoEngine
from flask_cors import CORS, cross_origin
app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/comments": {"origins": "*"}})

app.config['MONGODB_SETTINGS'] = {
  "db": "commentmodel",
  "host": "localhost",
  "port": 27017
}

db = MongoEngine()
db.init_app(app)

class Commentmodel(db.Document):
  _id = db.IntField()
  comment = db.StringField(required=True)
  user = db.StringField(required=True)
  time_stamp = db.IntField(required=True)
  song_id = db.StringField(required=True)
  user_pfp = db.StringField(required=True)

comment_post_args = reqparse.RequestParser()
comment_post_args.add_argument("comment", type=str, help="Comment body required", required=(True))
comment_post_args.add_argument("user", type=str, help="Username is required", required=(True))
comment_post_args.add_argument("song_id", type=str, help="Song id is required", required=(True))
comment_post_args.add_argument("time_stamp", type=int, help="time stamp is required", required=(True))
comment_post_args.add_argument("user_pfp", type=str, help="user profile pic is required", required=(True))


comment_get_args = reqparse.RequestParser()
comment_get_args.add_argument("song_id", type=str, help="Song id is required", required=(True))


resource_fields = {
  '_id': fields.Integer,
  'comment': fields.String,
  'song_id': fields.String,
  'time_stamp': fields.Integer,
  'user': fields.String,
  'user_pfp': fields.String
}


class CommentList(Resource):
  def get(self):
    args = comment_get_args.parse_args()
    comments = Commentmodel.objects(song_id=args["song_id"])
    if not comments:
      abort(404, message="Could not find comments with that song id")
    return jsonify({"comments": comments})
  
  @marshal_with(resource_fields)
  def post(self):
    args = comment_post_args.parse_args()
    comments = Commentmodel(song_id=args["song_id"], comment=args["comment"], user=args["user"], time_stamp=args["time_stamp"], user_pfp=args["user_pfp"]).save()
    return comments, 201

api.add_resource(CommentList, '/comments')

if __name__ == "__main__":
  app.run(debug=True)

