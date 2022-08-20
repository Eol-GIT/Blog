Vue.component('search-blogs', {
    props: ["query"],
    data() {
        return {
            page: 1,
            pageSize: 20,
            recentBlogs: [],
            blogs: [],
            searchInput: "",
            searchResults: []
        }
    },
    created(){
        this.getSearchResults(this.page);
        this.getRecentBlogs();
    },
    methods: {
        getSearchResults(page){
            ApiService.searchBlogs({params: {
                page: page, 
                per_page: this.pageSize, 
                search: this.query
            }}).then(
                res => {
                    this.blogs = res.data;
                    this.page = page;
                }
            )
        },
        getRecentBlogs(){
            ApiService.getBlogs({params: {page: 1, per_page: 6}}).then(
                res => {
                    this.recentBlogs = res.data.data;
                }
            )
        },
        searchBlogs(){
            if (this.searchInput){
                ApiService.searchBlogs({params: {
                    per_page: 5, 
                    search: this.searchInput.trim().replaceAll(' ', '+')
                }}).then(
                    res => {
                        this.searchResults = res.data.data;
                    }
                )
            }
        }
    },
    watch: {
        searchInput: {
          handler: function () {
              this.searchBlogs();
          },
        },
    },
    template: `
    <div>
    <div class="heading-page header-text">
        <section class="page-heading">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                    <div class="text-content">
                        <h4>Blogs by query</h4>
                        <h2>{{query}}</h2>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <section class="blog-posts grid-system mt-4">
        <div class="container">
            <div class="row">
                <div class="col-lg-9" id="blog-entries">
                    <div class="all-blog-posts">
                        <div class="row">
                            <div v-if="blogs.data.length === 0" class="col-lg-12">
                                <h3>No blogs have been found with the query: <i class="text-primary">{{query}}</i></h3>
                                <p>These are some of our most recent blogs:</p>
                                <hr>
                            </div>
                            <div class="col-lg-6" v-for="blog in blogs.data.length != 0 ? blogs.data : recentBlogs">
                            <a :href="'/' + blog.entry.slug + '/' + blog.slug">
                            <div class="blog-post">
                                <div class="down-content">
                                <a :href="'/' + blog.entry.slug + '/category/' + blog.category"><span class="blog-category">{{blog.category}}</span></a>
                                <h3 class="text-dark font-weight-bold" id="entry-blog-title">{{blog.title}}</h3>
                                <ul class="post-info">
                                    <li>{{blog.date}}</li>
                                </ul>
                                <hr class="devider">
                                </div>
                            </div>
                            </a>
                            </div>
                            <div class="col-lg-12 mb-4" v-if="blogs.data.length != 0">
                                <ul class="page-numbers">
                                    <li>
                                        <a @click="getSearchResults(blogs.prev_num)" href="#" onclick="return false;" :class="{'disabled': !blogs.has_prev}">
                                            <i class="fa fa-angle-double-left"></i>
                                        </a>
                                    </li>
                                    <li v-for="page in blogs.page_range" :class="{'active': page === blogs.page}">
                                        <a @click="getSearchResults(page)" href="#" onclick="return false;">{{page}}</a>
                                    </li>
                                    <li>
                                        <a @click="getSearchResults(blogs.next_num)" href="#" onclick="return false;" :class="{'disabled': !blogs.has_next}">
                                            <i class="fa fa-angle-double-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="sidebar">
                        <div class="row">
                        <div class="col-lg-12 p-0">
                            <div class="sidebar-item search">
                                <form @submit.prevent="location.href = '/search/blogs?search=' + searchInput.replaceAll(' ', '+');">
                                    <input type="text" class="searchText" placeholder="Search Blogs..." autocomplete="off" v-model="searchInput" @change="searchBlogs" required>
                                </form>
                                <div class="search-results" v-if="searchInput && searchResults.length > 0">
                                    <div v-for="result in searchResults">
                                        <a :href="'/' + result.entry.slug + '/' + result.slug" class="text-dark">
                                            <h5>{{result.title}}</h5>
                                            <small class="text-muted">{{nFormatter(result.views, 1)}} views</small>
                                        </a>
                                        <hr>
                                    </div>
                                    <a :href="'/search/blogs?search=' + searchInput.replaceAll(' ', '+')"><button class="btn btn-sm btn-primary w-100">View All</button></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="sidebar-item recent-posts">
                            <div class="sidebar-heading">
                                <h2>Recent Blogs</h2>
                            </div>
                            <div class="content">
                                <ul>
                                    <li v-for="blog in recentBlogs">
                                        <a :href="'/' + blog.entry.slug + '/' + blog.slug">
                                            <div class="row">
                                                <div class="col-12">
                                                    <h5>{{blog.title}}</h5>
                                                    <small class="text-muted">{{blog.date}} | {{nFormatter(blog.views, 1)}} views</small>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
    `
})
new Vue({el: "#search-blogs"});