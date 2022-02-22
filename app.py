from flask import Flask, jsonify, render_template, request
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
    keywords = db.Column(db.String(200))
    views = db.Column(db.Integer, default=0)
    date_posted = db.Column(db.DateTime, default=datetime.now())
    __table_args__ = (db.UniqueConstraint('slug',),)

class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(200))
    last_name = db.Column(db.String(200))
    slug = db.Column(db.String(200))
    body = db.Column(db.Text)
    img = db.Column(db.String(200), default="blog/assets/images/default-author.png")
    blogs = db.relationship('Blog', backref='author', lazy=True)
    keywords = db.Column(db.String(200))
    views = db.Column(db.Integer, default=0)
    date_posted = db.Column(db.DateTime, default=datetime.now())
    __table_args__ = (db.UniqueConstraint('slug',),)

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    slug = db.Column(db.String(200))
    category = db.Column(db.String(200))
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'), nullable=False)
    entry_id = db.Column(db.Integer, db.ForeignKey('entry.id'), nullable=False)
    body = db.Column(db.Text)
    keywords = db.Column(db.String(200))
    views = db.Column(db.Integer, default=0)
    date_posted = db.Column(db.DateTime, default=datetime.now())
    __table_args__ = (db.UniqueConstraint('slug',),)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/projects/<string:project>')
def projects(project):
    return render_template(f'projects/{project}.html')

@app.route('/blog')
def blog():
    return render_template('blog/index.html')

@app.route('/blog/about-us')
def about():
    return render_template('blog/about.html')

@app.route('/blog/contact-us')
def contact():
    return render_template('blog/contact.html')

@app.route('/blog/entries')
def entries():
    return render_template('blog/entries.html')

@app.route('/blog/entries/<string:slug>')
def blogentry(slug):
    entry = Entry.query.filter_by(slug=slug).one()
    entry.views = entry.views + 1
    db.session.commit()
    return render_template('blog/entry.html', entry=entry, keywords=entry.keywords)

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
        keywords = request.json["keywords"]
        
        query_author = Author.query.filter_by(id=author).one()
        query_entry = Entry.query.filter_by(id=entry).one()

        post = Blog(title=title, slug=slugify(title), category=category.lower(), author=query_author, entry=query_entry, body=body, keywords=keywords)

        db.session.add(post)
        db.session.commit()
    return render_template('admin/create-blog.html')

@app.route('/admin/create-entry', methods=["POST", "GET"])
def createentry():
    if request.method == "POST":
        title = request.json["title"]
        img = request.json["img"]
        body = request.json["body"]
        keywords = request.json["keywords"]

        entry = Entry(title=title, slug=slugify(title), img=img, body=body, keywords=keywords)

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
        keywords = request.json["keywords"]

        author = Author(first_name=first_name, last_name=last_name, slug=slugify(first_name + " " + last_name), img=img, body=body, keywords=keywords)

        db.session.add(author)
        db.session.commit()
    return render_template('admin/create-author.html')

"""
================================ REST ENDPOINTS =============================
"""
@app.route('/rest/s1/blogs', methods=["GET"])
def getblogs():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    if request.args.get('category'):
        query = Blog.query.filter_by(category=request.args.get('category'))
    elif request.args.get('entry'):
        query = Blog.query.filter(Blog.entry.has(slug=request.args.get('entry')))
    else:
        query = Blog.query

    paginated_items = query.order_by(Blog.id.desc()).paginate(page=page, per_page=per_page)

    return jsonify(helpers.getPaginatedDict(helpers.getBlogsList(paginated_items.items), paginated_items))

@app.route('/rest/s1/blogs/<int:id>', methods=["GET"])
def getBlogDetails(id):
    return jsonify(
        helpers.getBlogsList(
            Blog.query.filter_by(id=id).all()
            )[0]
        )

@app.route('/rest/s1/entries', methods=["GET"])
def getEntries():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    paginated_items = Entry.query.order_by(Entry.id.desc()).paginate(page=page, per_page=per_page)

    return jsonify(helpers.getPaginatedDict(helpers.getEntriesList(paginated_items.items), paginated_items))

@app.route('/rest/s1/top-entries', methods=["GET"])
def getTopEntries():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    paginated_items = Entry.query.order_by(Entry.views).paginate(page=page, per_page=per_page)

    return jsonify(helpers.getPaginatedDict(helpers.getEntriesList(paginated_items.items), paginated_items))

@app.route('/rest/s1/entries/<string:slug>', methods=["GET"])
def getEntryDetails(slug):
    return jsonify(
        helpers.getEntriesList(
            Entry.query.filter_by(slug=slug).all()
            )[0]
        )

@app.route('/rest/s1/entries/<string:slug>/blogs', methods=["GET"])
def getEntryBlogs(slug):
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    paginated_items = Blog.query.filter(Blog.entry.has(slug=slug)).order_by(Blog.id.desc()).paginate(page=page, per_page=per_page)

    return jsonify(helpers.getPaginatedDict(helpers.getBlogsList(paginated_items.items), paginated_items))

@app.route('/rest/s1/authors', methods=["GET"])
def getAuthors():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    paginated_items = Author.query.order_by(Author.id.desc()).paginate(page=page, per_page=per_page)
    return jsonify(helpers.getPaginatedDict(helpers.getAuthorsList(paginated_items.items), paginated_items))

@app.route('/rest/s1/authors/<string:slug>', methods=["GET"])
def getAuthorDetails(slug):
    return jsonify(
        helpers.getAuthorsList(
            Author.query.filter_by(slug=slug).all()
            )[0]
        )

@app.route('/rest/s1/authors/<string:slug>/blogs', methods=["GET"])
def getAuthorBlogs(slug):
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    paginated_items = Blog.query.filter(Blog.author.has(slug=slug)).order_by(Blog.id.desc()).paginate(page=page, per_page=per_page)
    return jsonify(helpers.getPaginatedDict(helpers.getBlogsList(paginated_items.items), paginated_items))

@app.route('/rest/s1/categories', methods=["GET"])
def getCategories():
    per_page = request.args.get('per_page', 5, type=int)
    categories = []

    if request.args.get('entry'):
        query = Blog.query.filter(Blog.entry.has(slug=request.args.get('entry')))
    else:
        query = Blog.query

    for i in query.order_by(Blog.id.desc()).all():
        if i.category not in categories:
            categories.append(i.category)

    return jsonify(categories[:per_page])

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)