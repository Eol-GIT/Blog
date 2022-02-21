def getAuthorsList(authors):
    authors_list = []
    for i in authors:
        author_dict = {
            "id": i.id,
            "firstName": i.first_name,
            "lastName": i.last_name,
            "slug": i.slug,
            "body": i.body,
            "img": i.img,
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
            "body": i.body,
            "img": i.img,
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
                "body": i.author.body,
                "img": i.author.img,
            },
            "entry": {
                "id": i.entry.id,
                "title": i.entry.title,
                "slug": i.entry.slug,
                "body": i.entry.body,
                "img": i.entry.img,
            },
            "body": i.body,
            "date": i.date_posted,
        }
        blogs_list.append(blogs_dict)
    return blogs_list