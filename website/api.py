from flask import Blueprint, request, jsonify, request, Response
from .models import Author, Blog, Entry, Comment
from datetime import datetime
from .helpers import getAuthorsList, getEntriesList, getBlogsList, getPaginatedDict, getCommentsList
from . import db
from slugify import slugify
from sqlalchemy import or_

api = Blueprint('api', __name__)

@api.route('/rest/s1/blogs', methods=["GET"])
def getBlogs():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    if request.args.get('category'):
        query = Blog.query.filter_by(category=request.args.get('category'))
    elif request.args.get('entry'):
        query = Blog.query.filter(Blog.entry.has(slug=request.args.get('entry')))
    else:
        query = Blog.query

    total_views = 0

    paginated_items = query.order_by(Blog.id.desc()).paginate(page=page, per_page=per_page)
    blogs = getPaginatedDict(getBlogsList(paginated_items.items), paginated_items)
    for i in Blog.query.all():
        total_views += i.views
    
    blogs["totalViews"] = total_views

    return jsonify(blogs)

@api.route('/rest/s1/blogs/<string:slug>', methods=["GET"])
def getBlogDetails(slug):
    blog = Blog.query.filter_by(slug=slug).first_or_404()
    query = Blog.query.filter(Blog.entry.has(slug=blog.entry.slug))\
                .filter_by(category = blog.category)
    next_blog = query.order_by(Blog.id)\
                .filter(Blog.id > blog.id).first()
    prev_blog = query.order_by(Blog.id.desc())\
                .filter(Blog.id < blog.id).first()
    blog_details = getBlogsList(Blog.query.filter_by(slug=slug).all())[0]
    if prev_blog:
        blog_details["prev_blog"] = {"id": prev_blog.id, "title": prev_blog.title, "slug": prev_blog.slug}
    if next_blog:
        blog_details["next_blog"] = {"id": next_blog.id, "title": next_blog.title, "slug": next_blog.slug}

    return jsonify(blog_details)

@api.route('/rest/s1/blogs/<string:slug>/delete', methods=["POST"])
def deleteBlog(slug):
    blog = Blog.query.filter_by(slug=slug).delete()
    db.session.commit()
    return jsonify(blog)

@api.route('/rest/s1/blogs/<string:slug>/update', methods=["GET", "POST"])
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
    blog.category = category.lower()
    blog.author = query_author
    blog.entry = query_entry
    blog.body = body
    blog.keywords = keywords
    blog.modified = datetime.now()

    db.session.commit()
    return Response(f"{blog.slug} updated successfully!", 200)

@api.route('/rest/s1/entries', methods=["GET"])
def getEntries():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    paginated_items = Entry.query.order_by(Entry.id.desc()).paginate(page=page, per_page=per_page)

    return jsonify(getPaginatedDict(getEntriesList(paginated_items.items), paginated_items))

@api.route('/rest/s1/top-entries', methods=["GET"])
def getTopEntries():
    per_page = request.args.get('per_page', 10, type=int)
    entries = Entry.query.order_by(Entry.views.desc()).limit(per_page).all()

    return jsonify(getEntriesList(entries))

@api.route('/rest/s1/entries/<string:slug>', methods=["GET"])
def getEntryDetails(slug):
    return jsonify(
        getEntriesList(
            Entry.query.filter_by(slug=slug).all()
            )[0]
        )

@api.route('/rest/s1/entries/<string:slug>/delete', methods=["POST"])
def deleteEntry(slug):
    entry = Entry.query.filter_by(slug=slug).delete()
    db.session.commit()
    return jsonify(entry)

@api.route('/rest/s1/entries/<string:slug>/update', methods=["POST"])
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

@api.route('/rest/s1/entries/<string:slug>/blogs', methods=["GET"])
def getEntryBlogs(slug):
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    paginated_items = Blog.query.filter(Blog.entry.has(slug=slug)).order_by(Blog.id.desc()).paginate(page=page, per_page=per_page)

    return jsonify(getPaginatedDict(getBlogsList(paginated_items.items), paginated_items))

@api.route('/rest/s1/authors', methods=["GET"])
def getAuthors():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    paginated_items = Author.query.order_by(Author.id.desc()).paginate(page=page, per_page=per_page)
    return jsonify(getPaginatedDict(getAuthorsList(paginated_items.items), paginated_items))

@api.route('/rest/s1/top-authors', methods=["GET"])
def getTopAuthors():
    per_page = request.args.get('per_page', 10, type=int)
    authors = Author.query.order_by(Author.views.desc()).limit(per_page).all()

    return jsonify(getAuthorsList(authors))

@api.route('/rest/s1/authors/<string:slug>', methods=["GET"])
def getAuthorDetails(slug):
    return jsonify(
        getAuthorsList(
            Author.query.filter_by(slug=slug).all()
            )[0]
        )

@api.route('/rest/s1/authors/<string:slug>/delete', methods=["POST"])
def deleteAuthor(slug):
    author = Author.query.filter_by(slug=slug).delete()
    db.session.commit()
    return jsonify(author)

@api.route('/rest/s1/authors/<string:slug>/update', methods=["POST"])
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

@api.route('/rest/s1/authors/<string:slug>/blogs', methods=["GET"])
def getAuthorBlogs(slug):
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    total_views = 0

    paginated_items = Blog.query.filter(Blog.author.has(slug=slug)).order_by(Blog.id.desc()).paginate(page=page, per_page=per_page)
    blogs = getPaginatedDict(getBlogsList(paginated_items.items), paginated_items)
    for i in Blog.query.filter(Blog.author.has(slug=slug)).all():
        total_views += i.views
    
    blogs["totalViews"] = total_views
    return jsonify(blogs)

@api.route('/rest/s1/categories', methods=["GET"])
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

@api.route('/rest/s1/categories/<string:category>', methods=["GET"])
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

    return jsonify(getPaginatedDict(getBlogsList(paginated_items.items), paginated_items))

@api.route('/rest/s1/blogs/recommended', methods=["GET"])
def getRecommendedBlogs():
    entry = request.args.get('entry')
    blog = request.args.get('blog')
    category = request.args.get('category')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 4, type=int)

    query = Blog.query.filter_by(category=category).filter(Blog.entry.has(slug=entry), Blog.slug != blog)

    paginated_items = query.order_by(Blog.id.desc()).paginate(page=page, per_page=per_page)

    return jsonify(getPaginatedDict(getBlogsList(paginated_items.items), paginated_items))

@api.route('/rest/s1/comments', methods=["GET"])
def getComments():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 5, type=int)
    blog = request.args.get('blog')

    if blog:
        query = Comment.query.filter(Comment.blog.has(slug=blog))
    else:
        query = Comment.query

    paginated_items = query.order_by(Comment.id.desc()).paginate(page=page, per_page=per_page)
    return jsonify(getPaginatedDict(getCommentsList(paginated_items.items), paginated_items))

@api.route('/rest/s1/comments/create', methods=["POST"])
def createComment():
    illegal_words = ["<script>", "</script>", "<style>", "</style>"]
    first_name = request.json["firstName"]
    last_name = request.json["lastName"]
    body = request.json["body"]
    blog = request.json["blog"]

    if any(x in body for x in illegal_words):
        return


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

@api.route('/rest/s1/search/blogs')
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
    return jsonify(getPaginatedDict(getBlogsList(paginated_items.items), paginated_items))

@api.route('/rest/s1/search/entries')
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

    return jsonify(getPaginatedDict(getEntriesList(paginated_items.items), paginated_items))

@api.route('/rest/s1/search/authors')
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

    return jsonify(getPaginatedDict(getAuthorsList(paginated_items.items), paginated_items))