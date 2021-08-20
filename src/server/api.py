from flask import Flask, jsonify
from flask_restful import Resource, Api, abort, reqparse, fields, marshal_with
from flask_mongoengine import MongoEngine
import json
app = Flask(__name__)
api = Api(app)

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
  song_id = db.IntField(required=True)

comment_post_args = reqparse.RequestParser()
comment_post_args.add_argument("comment", type=str, help="Comment body required", required=(True))
comment_post_args.add_argument("user", type=str, help="Username is required", required=(True))
comment_post_args.add_argument("song_id", type=int, help="Song id is required", required=(True))
comment_post_args.add_argument("time_stamp", type=int, help="time stamp is required", required=(True))

comment_get_args = reqparse.RequestParser()
comment_get_args.add_argument("song_id", type=int, help="Song id is required", required=(True))


resource_fields = {
  '_id': fields.Integer,
  'comment': fields.String,
  'song_id': fields.Integer,
  'time_stamp': fields.Integer,
  'user': fields.String
}


class CommentList(Resource):
  def get(self):
    args = comment_get_args.parse_args()
    print(args)
    comments = Commentmodel.objects()#song_id=args["song_id"])
    print({"comments": comments})
    if not comments:
      abort(404, message="Could not find comments with that song id")
    return jsonify({"comments": comments})
  
  @marshal_with(resource_fields)
  def post(self):
    args = comment_post_args.parse_args()
    comments = Commentmodel(song_id=args["song_id"], comment=args["comment"], user=args["user"], time_stamp=args["time_stamp"]).save()
    return comments, 201
  
api.add_resource(CommentList, '/comments')

if __name__ == "__main__":
  app.run(debug=True)

