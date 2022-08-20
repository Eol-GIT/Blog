from flask import Blueprint, render_template, request, render_template, request, make_response
from .models import Author, Blog, Entry
from urllib.parse import urlparse
from .helpers import getEntriesList
from . import db

views = Blueprint('views', __name__)

project_list = ['sorting-visualizer', 'movie-freaks', 'dino-game', 'cyber-city', 'tower-war', 'e-commerce']

@views.errorhandler(404)
def error_404(e):
    return render_template('error/404.html'), 404

@views.errorhandler(403)
def error_403(e):
    return render_template('error/403.html'), 403

@views.errorhandler(500)
def error_500(e):
    return render_template('error/500.html'), 500

@views.route('/sitemap')
@views.route('/sitemap/')
@views.route('/sitemap.xml')
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

@views.route('/')
def index():
    return render_template('index.html')

@views.route('/projects/<string:project>')
def projects(project):
    if project not in project_list:
        return render_template('404.html'), 404
    return render_template(f'projects/{project}.html')

@views.route('/blog')
@views.route('/blog/')
def blog():
    per_page = request.args.get('per_page', 6, type=int)
    entries = getEntriesList(Entry.query.order_by(Entry.views.desc()).limit(per_page).all())
    for i in entries:
        i.pop('date')
    return render_template('blog/index.html', entries=entries)

@views.route('/blog/about-us')
def about():
    return render_template('blog/about.html')

@views.route('/blog/contact-us')
def contact():
    return render_template('blog/contact.html')

@views.route('/blog/faq')
def faq():
    return render_template('blog/faq.html')

@views.route('/blog/privacy-policy')
def privacyPolicy():
    return render_template('blog/privacy.html')

@views.route('/support-donate/')
def donate():
    return render_template('blog/donate.html')

@views.route('/blog/tutorials/')
def entries():
    return render_template('blog/entries.html')

@views.route('/<string:slug>/')
def blogEntry(slug):
    entry = Entry.query.filter_by(slug=slug).first_or_404()
    entry.views = entry.views + 1
    db.session.commit()
    return render_template('blog/entry.html', entry=entry, keywords=entry.keywords)

@views.route('/<string:entry>/<string:blog>')
def blogDetails(entry, blog):
    entry = Entry.query.filter_by(slug=entry).first_or_404()
    blog = Blog.query.filter_by(slug=blog).first_or_404()
    blog.views = blog.views + 1
    db.session.commit()
    return render_template('blog/blog-detail.html', blog=blog, entry=entry, keywords=blog.keywords)

@views.route('/<string:slug>/category/<string:category>')
def categoryBlogs(slug, category):
    category = category.replace('+', ' ')\
            .replace('%20', ' ')
    entry = Entry.query.filter_by(slug=slug).first_or_404()

    return render_template('blog/category-blogs.html', category=category, entry=entry, keywords=entry.keywords)

@views.route('/blog/authors/')
def authors():
    return render_template('blog/authors.html')

@views.route('/blog/<string:slug>')
def authorDetails(slug):
    author = Author.query.filter_by(slug=slug).first_or_404()
    author.views = author.views + 1
    db.session.commit()
    return render_template('blog/author-details.html', author=author, keywords=author.keywords)

@views.route('/search/blogs')
def searchBlogs():
    query = request.args.get('search')
    if query:
        query = query.strip().replace('+', ' ')\
            .replace('%20', ' ')
    else:
        query = "*"
    return render_template('blog/search-blogs.html', query=query)

@views.route('/search/tutorials/')
def searchEntries():
    query = request.args.get('search')
    if query:
        query = query.strip().replace('+', ' ')\
            .replace('%20', ' ')
    else:
        query = "*"
    return render_template('blog/search-entries.html', query=query)

@views.route('/search/authors')
def searchAuthors():
    query = request.args.get('search')
    if query:
        query = query.strip().replace('+', ' ')\
            .replace('%20', ' ')
    else:
        query = "*"
    return render_template('blog/search-authors.html', query=query)

"""
================================ REST ENDPOINTS =============================
"""

"""
@views.route('/rest/s1/banner/<string:slug>')
def getimg(slug):
    blog = Blog.query.filter_by(slug=slug).first_or_404()
    width = 1920
    height = 1080
    if len(blog.title) > 83:
        message = blog.title[0:82] + "..."
    else:
        message = blog.title

    wraped_txt = textwrap.wrap(message, width=22, break_long_words=True)
    message = "\n".join(wraped_txt)

    img = Image.new('RGB', (width, height), color='white')
    img1 = Image.open('static/blog/assets/images/blog-fill.png')


    imgDraw = ImageDraw.Draw(img)

    img.paste(img1)
    font = ImageFont.truetype("static/blog/assets/fonts/Raleway-Bold.ttf", size=150)
    imgDraw.text((120, 100), message, fill=(0, 0, 0), font=font)
    img.save('static/blog/assets/images/result1.png')

    return send_file('static/blog/assets/images/result1.png', mimetype='image/gif')
"""