from . import db
from flask_login import UserMixin
from datetime import datetime


class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    slug = db.Column(db.String(200), unique=True)
    body = db.Column(db.Text)
    img = db.Column(db.String(200), default="blog/assets/images/entries/default.png")
    keywords = db.Column(db.String(200))
    views = db.Column(db.Integer, default=0)
    date_posted = db.Column(db.DateTime, default=datetime.now())
    modified = db.Column(db.DateTime, default=datetime.now())
    blogs = db.relationship('Blog', backref='entry', lazy=True)

class Author(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(200))
    last_name = db.Column(db.String(200))
    username = db.Column(db.String(200), unique=True)
    slug = db.Column(db.String(200), unique=True)
    email = db.Column(db.String(200), unique=True)
    password = db.Column(db.String(200))
    location = db.Column(db.String(200))
    social = db.Column(db.String(200))
    img = db.Column(db.String(200), default="blog/assets/images/authors/default.png")
    body = db.Column(db.Text)
    keywords = db.Column(db.String(200))
    views = db.Column(db.Integer, default=0)
    date_posted = db.Column(db.DateTime, default=datetime.now())
    modified = db.Column(db.DateTime, default=datetime.now())
    blogs = db.relationship('Blog', backref='author', lazy=True)

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    slug = db.Column(db.String(200), unique=True)
    category = db.Column(db.String(200))
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'), nullable=False)
    entry_id = db.Column(db.Integer, db.ForeignKey('entry.id'), nullable=False)
    body = db.Column(db.Text)
    keywords = db.Column(db.String(200))
    views = db.Column(db.Integer, default=0)
    date_posted = db.Column(db.DateTime, default=datetime.now())
    modified = db.Column(db.DateTime, default=datetime.now())
    comments = db.relationship('Comment', backref='blog', lazy=True)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(200))
    last_name = db.Column(db.String(200))
    body = db.Column(db.Text)
    blog_id = db.Column(db.Integer, db.ForeignKey('blog.id'), nullable=False)
    date_posted = db.Column(db.DateTime, default=datetime.now())
    modified = db.Column(db.DateTime, default=datetime.now())