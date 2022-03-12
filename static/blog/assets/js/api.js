var ApiService = {
    //Blog endpoints
    getBlogs: function(params) {
        return axios.get(`/rest/s1/blogs`, params)
        .then(function (response) { return response; });
    },
    getBlogDetails: function(slug) {
        return axios.get(`/rest/s1/blogs/${slug}`)
        .then(function (response) { return response; });
    },
    updateBlog: function(slug, params) {
        return axios.post(`/rest/s1/blogs/${slug}/update`, params)
        .then(function (response) { return response; });
    },
    deleteBlog: function(slug, params) {
        return axios.post(`/rest/s1/blogs/${slug}/delete`, params)
        .then(function (response) { return response; });
    },
    //Entry endpoints
    getEntries: function(params) {
        return axios.get(`/rest/s1/entries`, params)
        .then(function (response) { return response; });
    },
    getTopEntries: function(params) {
        return axios.get(`/rest/s1/top-entries`, params)
        .then(function (response) { return response; });
    },
    getEntryDetails: function(slug) {
        return axios.get(`/rest/s1/entries/${slug}`)
        .then(function (response) { return response; });
    },
    getEntryBlogs: function(slug, params) {
        return axios.get(`/rest/s1/entries/${slug}/blogs`, params)
        .then(function (response) { return response; });
    },
    updateEntry: function(slug, params) {
        return axios.post(`/rest/s1/entries/${slug}/update`, params)
        .then(function (response) { return response; });
    },
    deleteEntry: function(slug, params) {
        return axios.post(`/rest/s1/entries/${slug}/delete`, params)
        .then(function (response) { return response; });
    },
    //Author endpoints
    getAuthors: function(params) {
        return axios.get(`/rest/s1/authors`, params)
        .then(function (response) { return response; });
    },
    getTopAuthors: function(params) {
        return axios.get(`/rest/s1/top-authors`, params)
        .then(function (response) { return response; });
    },
    getAuthorDetails: function(slug) {
        return axios.get(`/rest/s1/authors/${slug}`)
        .then(function (response) { return response; });
    },
    getAuthorBlogs: function(slug, params) {
        return axios.get(`/rest/s1/authors/${slug}/blogs`, params)
        .then(function (response) { return response; });
    },
    updateAuthor: function(slug, params) {
        return axios.post(`/rest/s1/authors/${slug}/update`, params)
        .then(function (response) { return response; });
    },
    deleteAuthor: function(slug, params) {
        return axios.post(`/rest/s1/authors/${slug}/delete`, params)
        .then(function (response) { return response; });
    },
    //Category endpoints
    getCategories: function(params) {
        return axios.get(`/rest/s1/categories`, params)
        .then(function (response) { return response; });
    },
    getCategoryBlogs: function(category, params) {
        return axios.get(`/rest/s1/categories/${category}`, params)
        .then(function (response) { return response; });
    },
    //Comment endpoints
    getComments: function(params) {
        return axios.get(`/rest/s1/comments`, params)
        .then(function (response) { return response; });
    },
    createComment: function(params) {
        return axios.post(`/rest/s1/comments/create`, params)
        .then(function (response) { return response; });
    },
    //Search endpoints
    searchBlogs: function(params) {
        return axios.get(`/rest/s1/search/blogs`, params)
        .then(function (response) { return response; });
    },
    searchAuthors: function(params) {
        return axios.get(`/rest/s1/search/authors`, params)
        .then(function (response) { return response; });
    },
    searchEntries: function(params) {
        return axios.get(`/rest/s1/search/entries`, params)
        .then(function (response) { return response; });
    },
}