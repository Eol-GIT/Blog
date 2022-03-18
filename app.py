from flask import Flask, jsonify, render_template, request, Response, redirect, url_for, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import or_
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate
from datetime import datetime, timedelta
from flask_cors import CORS
import helpers
from slugify import slugify
from flask_login import UserMixin, LoginManager, login_user, login_required, logout_user
from urllib.parse import urlparse

app = Flask(__name__)
app.secret_key = "thiskeyissoscret"
app.permanent_session_lifetime = timedelta(days=365)
login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
project_list = ['sorting-visualizer', 'movie-freaks', 'dino-game', 'cyber-city', 'tower-war', 'e-commerce']

db = SQLAlchemy(app)
migrate = Migrate(app, db)

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


@app.errorhandler(404)
def error_404(e):
    return render_template('error/404.html'), 404

@app.errorhandler(403)
def error_403(e):
    return render_template('error/403.html'), 403

@app.errorhandler(500)
def error_500(e):
    return render_template('error/500.html'), 500

@login_manager.user_loader
def load_user(user_id):
    # since the user_id is just the primary key of our user table, use it in the query for the user
    return Author.query.get(int(user_id))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.json["email"]
        password = request.json["password"]

        user = Author.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password, password):
            return Response("error", 401)

        login_user(user, remember=True)
        return redirect(url_for('admin'))
    return render_template('admin/login.html', )

@app.route('/sitemap')
@app.route('/sitemap/')
@app.route('/sitemap.xml')
def sitemap():
    host_components = urlparse(request.host_url)
    base_url = host_components.scheme + "://" + host_components.netloc
    blogs = Blog.query.order_by(Blog.id).all()
    authors = Author.query.order_by(Author.id).all()
    entries = Entry.query.order_by(Entry.id).all()
    xml_sitemap = render_template('sitemap.xml', projects=project_list, blogs=blogs, authors=authors, entries=entries, base_url=base_url)
    response = make_response(xml_sitemap)
    response.headers["Content-Type"] = "application/xml"
    return response

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/projects/<string:project>')
def projects(project):
    if project not in project_list:
        return render_template('404.html'), 404
    return render_template(f'projects/{project}.html')

@app.route('/blog')
@app.route('/blog/')
def blog():
    per_page = request.args.get('per_page', 6, type=int)
    entries = helpers.getEntriesList(Entry.query.order_by(Entry.views.desc()).limit(per_page).all())
    for i in entries:
        i.pop('date')
    return render_template('blog/index.html', entries=entries)

@app.route('/blog/about-us')
def about():
    return render_template('blog/about.html')

@app.route('/blog/contact-us')
def contact():
    return render_template('blog/contact.html')

@app.route('/blog/faq')
def faq():
    return render_template('blog/faq.html')

@app.route('/blog/entries/')
def entries():
    return render_template('blog/entries.html')

@app.route('/<string:slug>/')
def blogEntry(slug):
    entry = Entry.query.filter_by(slug=slug).first_or_404()
    entry.views = entry.views + 1
    db.session.commit()
    return render_template('blog/entry.html', entry=entry, keywords=entry.keywords)

@app.route('/<string:entry>/<string:blog>')
def blogDetails(entry, blog):
    entry = Entry.query.filter_by(slug=entry).first_or_404()
    blog = Blog.query.filter_by(slug=blog).first_or_404()
    blog.views = blog.views + 1
    db.session.commit()
    return render_template('blog/blog-detail.html', blog=blog, entry=entry, keywords=blog.keywords)

@app.route('/<string:slug>/category/<string:category>')
def categoryBlogs(slug, category):
    category = category.replace('+', ' ')\
            .replace('%20', ' ')
    entry = Entry.query.filter_by(slug=slug).first_or_404()

    return render_template('blog/category-blogs.html', category=category, entry=entry, keywords=entry.keywords)

@app.route('/blog/authors/')
def authors():
    return render_template('blog/authors.html')

@app.route('/blog/<string:slug>')
def authorDetails(slug):
    author = Author.query.filter_by(slug=slug).first_or_404()
    author.views = author.views + 1
    db.session.commit()
    return render_template('blog/author-details.html', author=author, keywords=author.keywords)

@app.route('/search/blogs')
def searchBlogs():
    query = request.args.get('search')
    if query:
        query = query.strip().replace('+', ' ')\
            .replace('%20', ' ')
    else:
        query = "*"
    return render_template('blog/search-blogs.html', query=query)

@app.route('/search/entries')
def searchEntries():
    query = request.args.get('search')
    if query:
        query = query.strip().replace('+', ' ')\
            .replace('%20', ' ')
    else:
        query = "*"
    return render_template('blog/search-entries.html', query=query)

@app.route('/search/authors')
def searchAuthors():
    query = request.args.get('search')
    if query:
        query = query.strip().replace('+', ' ')\
            .replace('%20', ' ')
    else:
        query = "*"
    return render_template('blog/search-authors.html', query=query)
"""
================================ BLOG ADMIN =============================
"""
@app.route('/admin')
@login_required
def admin():
    return render_template('admin/index.html')

@app.route('/admin/create-blog', methods=["POST", "GET"])
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

@app.route('/admin/create-entry', methods=["POST", "GET"])
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

@app.route('/admin/create-author', methods=["POST", "GET"])
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

@app.route('/admin/authors')
@login_required
def adminAuthors():
    return render_template('admin/view-authors.html')

@app.route('/admin/authors/<string:slug>')
@login_required
def adminAuthorDetails(slug):
    author = Author.query.filter_by(slug=slug).first_or_404()
    return render_template('admin/edit-author.html', author=author)

@app.route('/admin/entries')
@login_required
def adminEntries():
    return render_template('admin/view-entries.html')

@app.route('/admin/entries/<string:slug>')
@login_required
def adminEntryDetails(slug):
    entry = Entry.query.filter_by(slug=slug).first_or_404()
    return render_template('admin/edit-entry.html', entry=entry)

@app.route('/admin/blogs')
@login_required
def adminBlogs():
    return render_template('admin/view-blogs.html')

@app.route('/admin/blogs/<string:slug>')
@login_required
def adminBlogDetails(slug):
    blog = Blog.query.filter_by(slug=slug).first_or_404()
    return render_template('admin/edit-blog.html', blog=blog)

"""
================================ REST ENDPOINTS =============================
"""
@app.route('/rest/s1/blogs', methods=["GET"])
def getBlogs():
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

@app.route('/rest/s1/blogs/<string:slug>', methods=["GET"])
def getBlogDetails(slug):
    blog = Blog.query.filter_by(slug=slug).first_or_404()
    query = Blog.query.filter(Blog.entry.has(slug=blog.entry.slug))\
                .filter_by(category = blog.category)
    next_blog = query.order_by(Blog.id)\
                .filter(Blog.id > blog.id).first()
    prev_blog = query.order_by(Blog.id.desc())\
                .filter(Blog.id < blog.id).first()
    blog_details = helpers.getBlogsList(Blog.query.filter_by(slug=slug).all())[0]
    if prev_blog:
        blog_details["prev_blog"] = {"id": prev_blog.id, "title": prev_blog.title, "slug": prev_blog.slug}
    if next_blog:
        blog_details["next_blog"] = {"id": next_blog.id, "title": next_blog.title, "slug": next_blog.slug}

    return jsonify(blog_details)

@app.route('/rest/s1/blogs/<string:slug>/delete', methods=["POST"])
def deleteBlog(slug):
    blog = Blog.query.filter_by(slug=slug).delete()
    db.session.commit()
    return jsonify(blog)

@app.route('/rest/s1/blogs/<string:slug>/update', methods=["POST"])
def editBlog(slug):
    title = request.json["title"]
    category = request.json["category"]
    author = request.json["author"]
    entry = request.json["entry"]
    body = request.json["body"]
    keywords = request.json["keywords"]
    query_author = Author.query.filter_by(id=author).one()
    query_entry = Entry.query.filter_by(id=entry).one()

    blog = Blog.query.filter_by(slug=slug).first_or_404()
    blog.title = title
    blog.slug = slugify(title)
    blog.category = category.lower()
    blog.author = query_author
    blog.entry = query_entry
    blog.body = body
    blog.keywords = keywords
    blog.modified = datetime.now()

    db.session.commit()
    return Response(f"{blog.slug} updated successfully!", 200)

@app.route('/rest/s1/entries', methods=["GET"])
def getEntries():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    paginated_items = Entry.query.order_by(Entry.id.desc()).paginate(page=page, per_page=per_page)

    return jsonify(helpers.getPaginatedDict(helpers.getEntriesList(paginated_items.items), paginated_items))

@app.route('/rest/s1/top-entries', methods=["GET"])
def getTopEntries():
    per_page = request.args.get('per_page', 10, type=int)
    entries = Entry.query.order_by(Entry.views.desc()).limit(per_page).all()

    return jsonify(helpers.getEntriesList(entries))

@app.route('/rest/s1/entries/<string:slug>', methods=["GET"])
def getEntryDetails(slug):
    return jsonify(
        helpers.getEntriesList(
            Entry.query.filter_by(slug=slug).all()
            )[0]
        )

@app.route('/rest/s1/entries/<string:slug>/delete', methods=["POST"])
def deleteEntry(slug):
    entry = Entry.query.filter_by(slug=slug).delete()
    db.session.commit()
    return jsonify(entry)

@app.route('/rest/s1/entries/<string:slug>/update', methods=["POST"])
def editEntry(slug):
    title = request.json["title"]
    img = request.json["img"]
    body = request.json["body"]
    keywords = request.json["keywords"]

    entry = Entry.query.filter_by(slug=slug).first_or_404()
    entry.title = title
    entry.slug = slugify(title)
    entry.img = img
    entry.body = body
    entry.keywords = keywords
    entry.modified = datetime.now()

    db.session.commit()
    return Response(f"{entry.slug} updated successfully!", 200)

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

@app.route('/rest/s1/top-authors', methods=["GET"])
def getTopAuthors():
    per_page = request.args.get('per_page', 10, type=int)
    authors = Author.query.order_by(Author.views.desc()).limit(per_page).all()

    return jsonify(helpers.getAuthorsList(authors))

@app.route('/rest/s1/authors/<string:slug>', methods=["GET"])
def getAuthorDetails(slug):
    return jsonify(
        helpers.getAuthorsList(
            Author.query.filter_by(slug=slug).all()
            )[0]
        )

@app.route('/rest/s1/authors/<string:slug>/delete', methods=["POST"])
def deleteAuthor(slug):
    author = Author.query.filter_by(slug=slug).delete()
    db.session.commit()
    return jsonify(author)

@app.route('/rest/s1/authors/<string:slug>/update', methods=["POST"])
def editAuthor(slug):
    first_name = request.json["firstName"]
    last_name = request.json["lastName"]
    username = request.json["username"]
    email = request.json["email"]
    img = request.json["img"]
    location = request.json["location"]
    social = request.json["social"]
    body = request.json["body"]
    keywords = request.json["keywords"]

    author = Author.query.filter_by(slug=slug).first_or_404()
    author.first_name = first_name
    author.last_name = last_name
    author.username = username
    author.email = email
    author.slug = slugify(username)
    author.img = img
    author.location = location
    author.social = social
    author.body = body
    author.keywords = keywords
    author.modified = datetime.now()

    db.session.commit()
    return Response(f"{author.slug} updated successfully!", 200)

@app.route('/rest/s1/authors/<string:slug>/blogs', methods=["GET"])
def getAuthorBlogs(slug):
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    total_views = 0

    paginated_items = Blog.query.filter(Blog.author.has(slug=slug)).order_by(Blog.id.desc()).paginate(page=page, per_page=per_page)
    blogs = helpers.getPaginatedDict(helpers.getBlogsList(paginated_items.items), paginated_items)
    for i in Blog.query.filter(Blog.author.has(slug=slug)).all():
        total_views += i.views
    
    blogs["totalViews"] = total_views
    return jsonify(blogs)

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

@app.route('/rest/s1/categories/<string:category>', methods=["GET"])
def getCategoryBlogs(category):
    category = category.replace('+', ' ')\
            .replace('%20', ' ')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 16, type=int)

    if request.args.get('entry'):
        query = Blog.query.filter(Blog.entry.has(slug=request.args.get('entry')))
    else:
        query = Blog.query

    query = query.filter_by(category=category)

    paginated_items = query.order_by(Blog.id.desc()).paginate(page=page, per_page=per_page)

    return jsonify(helpers.getPaginatedDict(helpers.getBlogsList(paginated_items.items), paginated_items))

@app.route('/rest/s1/comments', methods=["GET"])
def getComments():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 5, type=int)
    blog = request.args.get('blog')

    paginated_items = Comment.query.filter(Comment.blog.has(slug=blog)).order_by(Comment.id.desc()).paginate(page=page, per_page=per_page)
    return jsonify(helpers.getPaginatedDict(helpers.getCommentsList(paginated_items.items), paginated_items))

@app.route('/rest/s1/comments/create', methods=["POST"])
def createComment():
    first_name = request.json["firstName"]
    last_name = request.json["lastName"]
    body = request.json["body"]
    blog = request.json["blog"]

    query_blog = Blog.query.filter_by(slug=blog).one()
    
    comment = Comment(
        first_name = first_name,
        last_name = last_name,
        body = body,
        blog = query_blog
    )
    db.session.add(comment)
    db.session.commit()
    return Response("Comment created successfully!", 200)

@app.route('/rest/s1/search/blogs')
def getSearchedBlogs():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 5, type=int)
    search = request.args.get('search')
    if search:
        search = search.strip().replace('+', ' ')\
            .replace('%20', ' ')
    else: 
        search = "*"

    if '*' in search or '_' in search: 
        looking_for = search.replace('_', '__')\
            .replace('*', '%')\
            .replace('?', '_')
    else:
        looking_for = '%{0}%'.format(search)

    paginated_items = Blog.query.filter(or_(
        Blog.title.ilike(looking_for),
        Blog.body.ilike(looking_for),
        ))\
        .order_by(Blog.views.desc()).paginate(page=page, per_page=per_page)
    return jsonify(helpers.getPaginatedDict(helpers.getBlogsList(paginated_items.items), paginated_items))

@app.route('/rest/s1/search/entries')
def getSearchedEntries():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 5, type=int)
    search = request.args.get('search')
    if search:
        search = search.strip().replace('+', ' ')\
            .replace('%20', ' ')
    else: 
        search = "*"

    if '*' in search or '_' in search: 
        looking_for = search.replace('_', '__')\
            .replace('*', '%')\
            .replace('?', '_')
    else:
        looking_for = '%{0}%'.format(search)

    paginated_items = Entry.query.filter(Entry.title.ilike(looking_for)).order_by(Entry.views.desc()).paginate(page=page, per_page=per_page)

    return jsonify(helpers.getPaginatedDict(helpers.getEntriesList(paginated_items.items), paginated_items))

@app.route('/rest/s1/search/authors')
def getSearchedAuthors():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 5, type=int)
    search = request.args.get('search')
    if search:
        search = search.strip().replace('+', ' ')\
            .replace('%20', ' ')
    else: 
        search = "*"

    if '*' in search or '_' in search: 
        looking_for = search.replace('_', '__')\
            .replace('*', '%')\
            .replace('?', '_')
    else:
        looking_for = '%{0}%'.format(search)

    paginated_items = Author.query.filter(or_(
        Author.username.ilike(looking_for),
        Author.first_name.ilike(looking_for),
        Author.last_name.ilike(looking_for)
        ))\
        .order_by(Author.views.desc()).paginate(page=page, per_page=per_page)

    return jsonify(helpers.getPaginatedDict(helpers.getAuthorsList(paginated_items.items), paginated_items))

if __name__ == '__main__':
    db.create_all()
    app.run()