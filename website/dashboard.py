from flask import Blueprint, render_template, request, render_template, request, Response
from flask_login import login_required
from .models import Author, Blog, Entry
from . import db
from slugify import slugify
from werkzeug.security import generate_password_hash

dashboard = Blueprint('dashboard', __name__)

@dashboard.route('/admin/')
@login_required
def admin():
    return render_template('admin/index.html')

@dashboard.route('/admin/create-blog', methods=["POST", "GET"])
@login_required
def createBlog():
    if request.method == "POST":
        title = request.json["title"]
        category = request.json["category"]
        author = request.json["author"]
        entry = request.json["entry"]
        body = request.json["body"]
        keywords = request.json["keywords"]
        
        query_author = Author.query.filter_by(id=author).one()
        query_entry = Entry.query.filter_by(id=entry).one()

        post = Blog(title=title, slug=slugify(title), category=category.lower(), author=query_author, entry=query_entry, body=body, keywords=keywords)

        db.session.add(post)
        db.session.commit()
    return render_template('admin/create-blog.html')

@dashboard.route('/admin/create-entry', methods=["POST", "GET"])
@login_required
def createEntry():
    if request.method == "POST":
        title = request.json["title"]
        img = request.json["img"]
        body = request.json["body"]
        keywords = request.json["keywords"]

        entry = Entry(title=title, slug=slugify(title), img='blog/assets/images/entries/' + img, body=body, keywords=keywords)

        db.session.add(entry)
        db.session.commit()
    return render_template('admin/create-entry.html')

@dashboard.route('/admin/create-author', methods=["POST", "GET"])
@login_required
def createAuthor():
    if request.method == "POST":
        first_name = request.json["firstName"]
        last_name = request.json["lastName"]
        username = request.json["username"]
        email = request.json["email"]
        password = request.json["password"]
        img = request.json["img"]
        location = request.json["location"]
        social = request.json["social"]
        body = request.json["body"]
        keywords = request.json["keywords"]

        user = Author.query.filter_by(email=email).first()

        if user:
            return Response("User already exists!", 400)

        author = Author(
            first_name=first_name, 
            last_name=last_name, 
            username=username, 
            email=email, 
            password=generate_password_hash(password, method='sha256'), 
            slug=slugify(username), 
            img='blog/assets/images/authors/' + img, 
            location=location, 
            social=social, 
            body=body, 
            keywords=keywords
        )

        db.session.add(author)
        db.session.commit()
    return render_template('admin/create-author.html')

@dashboard.route('/admin/authors/')
@login_required
def adminAuthors():
    return render_template('admin/view-authors.html')

@dashboard.route('/admin/authors/<string:slug>')
@login_required
def adminAuthorDetails(slug):
    author = Author.query.filter_by(slug=slug).first_or_404()
    return render_template('admin/edit-author.html', author=author)

@dashboard.route('/admin/entries/')
@login_required
def adminEntries():
    return render_template('admin/view-entries.html')

@dashboard.route('/admin/entries/<string:slug>')
@login_required
def adminEntryDetails(slug):
    entry = Entry.query.filter_by(slug=slug).first_or_404()
    return render_template('admin/edit-entry.html', entry=entry)

@dashboard.route('/admin/blogs/')
@login_required
def adminBlogs():
    return render_template('admin/view-blogs.html')

@dashboard.route('/admin/blogs/<string:slug>')
@login_required
def adminBlogDetails(slug):
    blog = Blog.query.filter_by(slug=slug).first_or_404()
    return render_template('admin/edit-blog.html', blog=blog)