from flask import Flask, jsonify, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime
from flask_cors import CORS
import helpers
from slugify import slugify

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    slug = db.Column(db.String(200))
    body = db.Column(db.Text)
    img = db.Column(db.String(200), default="blog/assets/images/default-blog.png")
    blogs = db.relationship('Blog', backref='entry', lazy=True)
    __table_args__ = (db.UniqueConstraint('slug',),)

class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(200))
    last_name = db.Column(db.String(200))
    slug = db.Column(db.String(200))
    body = db.Column(db.Text)
    img = db.Column(db.String(200), default="blog/assets/images/default-author.png")
    blogs = db.relationship('Blog', backref='author', lazy=True)
    __table_args__ = (db.UniqueConstraint('slug',),)

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    slug = db.Column(db.String(200))
    category = db.Column(db.String(200))
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'), nullable=False)
    entry_id = db.Column(db.Integer, db.ForeignKey('entry.id'), nullable=False)
    body = db.Column(db.Text)
    date_posted = db.Column(db.DateTime, default=datetime.now())
    __table_args__ = (db.UniqueConstraint('slug',),)


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

        post = Blog(title=title, slug=slugify(title), category=category.lower(), author=query_author, entry=query_entry, body=body)

        db.session.add(post)
        db.session.commit()
    return render_template('admin/create-blog.html', 
            entries=helpers.getEntriesList(Entry.query.all()), 
            authors=helpers.getAuthorsList(Author.query.all()), 
            blogs=Blog.query.all())

@app.route('/admin/create-entry', methods=["POST", "GET"])
def createentry():
    if request.method == "POST":
        title = request.json["title"]
        img = request.json["img"]
        body = request.json["body"]

        entry = Entry(title=title, slug=slugify(title), img=img, body=body)

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

        author = Author(first_name=first_name, last_name=last_name, slug=slugify(first_name + " " + last_name), img=img, body=body)

        db.session.add(author)
        db.session.commit()
    return render_template('admin/create-author.html')

"""
================================ REST ENDPOINTS =============================
"""
@app.route('/rest/s1/blogs', methods=["GET"])
def getblogs():
    if request.args.get('category'):
        query = Blog.query.filter_by(category=request.args.get('category'))
    else:
        query = Blog.query
    return jsonify(helpers.getBlogsList(query.all()))

@app.route('/rest/s1/blogs/<int:id>', methods=["GET"])
def getBlogDetails(id):
    return jsonify(
        helpers.getBlogsList(
            Blog.query.filter_by(id=id).all()
            )[0]
        )

@app.route('/rest/s1/entries', methods=["GET"])
def getEntries():
    return jsonify(
        helpers.getEntriesList(Entry.query.all())
        )

@app.route('/rest/s1/entries/<string:slug>', methods=["GET"])
def getEntryDetails(slug):
    return jsonify(
        helpers.getEntriesList(
            Entry.query.filter_by(slug=slug).all()
            )[0]
        )

@app.route('/rest/s1/entries/<string:slug>/blogs', methods=["GET"])
def getEntryBlogs(slug):
    return jsonify(
        helpers.getBlogsList(
            Blog.query.filter(Blog.entry.has(slug=slug)).all()
            )
        )

@app.route('/rest/s1/authors', methods=["GET"])
def getAuthors():
    return jsonify(
        helpers.getAuthorsList(
            Author.query.all()
            )
        )

@app.route('/rest/s1/authors/<string:slug>', methods=["GET"])
def getAuthorDetails(slug):
    return jsonify(
        helpers.getAuthorsList(
            Author.query.filter_by(slug=slug).all()
            )[0]
        )

@app.route('/rest/s1/authors/<string:slug>/blogs', methods=["GET"])
def getAuthorBlogs(slug):
    return jsonify(
        helpers.getBlogsList(
            Blog.query.filter(Blog.author.has(slug=slug)).all()
            )
        )


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)