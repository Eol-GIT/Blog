def getAuthorsList(authors):
    authors_list = []
    for i in authors:
        author_dict = {
            "id": i.id,
            "firstName": i.first_name,
            "lastName": i.last_name,
            "slug": i.slug,
            "img": i.img,
            "location": i.location,
            "social": i.social,
            "body": i.body,
            "keywords": i.keywords,
            "views": i.views,
            "date": i.date_posted,
        }
        authors_list.append(author_dict)
    return authors_list

def getEntriesList(entries):
    entries_list = []
    for i in entries:
        entries_dict = {
            "id": i.id,
            "title": i.title,
            "slug": i.slug,
            "img": i.img,
            "body": i.body,
            "keywords": i.keywords,
            "views": i.views,
            "date": i.date_posted,
        }
        entries_list.append(entries_dict)
    return entries_list

def getBlogsList(blogs):
    blogs_list = []
    for i in blogs:
        blogs_dict = {
            "id": i.id,
            "title": i.title,
            "slug": i.slug,
            "category": i.category,
            "author": {
                "id": i.author.id,
                "firstName": i.author.first_name,
                "lastName": i.author.last_name,
                "slug": i.author.slug, 
                "img": i.author.img,
                "location": i.author.location,
                "social": i.author.social,
                "body": i.author.body,
                "keywords": i.author.keywords,
                "views": i.author.views,
                "date": i.author.date_posted,
            },
            "entry": {
                "id": i.entry.id,
                "title": i.entry.title,
                "slug": i.entry.slug,
                "img": i.entry.img,
                "body": i.entry.body,
                "keywords": i.entry.keywords,
                "views": i.entry.views,
                "date": i.entry.date_posted,
            },
            "body": i.body,
            "keywords": i.keywords,
            "views": i.views,
            "date": i.date_posted,
        }
        blogs_list.append(blogs_dict)
    return blogs_list

def getCommentsList(comments):
    comments_list = []
    for i in comments:
        comments_dict = {
            "id": i.id,
            "firstName": i.first_name,
            "lastName": i.last_name,
            "blog": {
                "id": i.blog.id,
                "title": i.blog.title,
                "slug": i.blog.slug, 
                "body": i.blog.body,
                "category": i.blog.category,
                "keywords": i.blog.keywords,
                "views": i.blog.views,
                "date": i.blog.date_posted,
            },
            "body": i.body,
            "date": i.date_posted,
        }
        comments_list.append(comments_dict)
    return comments_list

def getPaginatedDict(data, paginated_items):
    return {
        "data": data,
        "has_next": paginated_items.has_next,
        "has_prev": paginated_items.has_prev,
        "page": paginated_items.page,
        "per_page": paginated_items.per_page,
        "pages": paginated_items.pages,
        "next_num": paginated_items.next_num,
        "prev_num": paginated_items.prev_num,
        "total": paginated_items.total,
    }