from nis import cat
from unicodedata import category
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    body = db.Column(db.Text)
    img = db.Column(db.String(50))
    blogs = db.relationship('Blog', backref='entry', lazy=True)

class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    body = db.Column(db.Text)
    img = db.Column(db.String(50))
    blogs = db.relationship('Blog', backref='author', lazy=True)

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    category = db.Column(db.String(50))
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'), nullable=False)
    entry_id = db.Column(db.Integer, db.ForeignKey('entry.id'), nullable=False)
    body = db.Column(db.Text)
    date_posted = db.Column(db.DateTime)


def createAuthorsList():
    authors_list = []
    for i in Author.query.all():
        author_dict = {
            "id": i.id,
            "firstName": i.first_name,
            "lastName": i.last_name,
            "body": i.body,
            "img": i.img,
        }
        authors_list.append(author_dict)
    return authors_list

def createEntresList():
    entries_list = []
    for i in Entry.query.all():
        entries_dict = {
            "id": i.id,
            "title": i.title,
            "img": i.img,
            "body": i.body,
        }
        entries_list.append(entries_dict)
    return entries_list

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/projects/<string:project>')
def projects(project):
    return render_template(f'projects/{project}.html')

"""
================================ BLOG ADMIN =============================
"""
@app.route('/admin')
def admin():
    return render_template('admin/index.html')

@app.route('/admin/create-blog', methods=["POST", "GET"])
def createblog():
    if request.method == "POST":
        title = request.json["title"]
        category = request.json["category"]
        author = request.json["author"]
        entry = request.json["entry"]
        body = request.json["body"]
        
        query_author = Author.query.filter_by(id=author).one()
        query_entry = Entry.query.filter_by(id=entry).one()

        post = Blog(title=title, category=category, author=query_author, entry=query_entry, body=body, date_posted=datetime.now())

        db.session.add(post)
        db.session.commit()
    return render_template('admin/create-blog.html', entries=createEntresList(), authors=createAuthorsList(), blogs=Blog.query.all())

@app.route('/admin/create-entry', methods=["POST", "GET"])
def createentry():
    if request.method == "POST":
        title = request.json["title"]
        img = request.json["img"]
        body = request.json["body"]

        entry = Entry(title=title, img=img, body=body)

        db.session.add(entry)
        db.session.commit()
    return render_template('admin/create-entry.html')

@app.route('/admin/create-author', methods=["POST", "GET"])
def createauthor():
    if request.method == "POST":
        first_name = request.json["firstName"]
        last_name = request.json["lastName"]
        img = request.json["img"]
        body = request.json["body"]

        author = Author(first_name=first_name, last_name=last_name, img=img, body=body)

        db.session.add(author)
        db.session.commit()
    return render_template('admin/create-author.html')

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)