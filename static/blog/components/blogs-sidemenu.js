Vue.component('sidemenu', {
    props: ["entrySlug"],
    data() {
        return {
            blogs: [],
            categories: [],
            searchResults: [],
            searchInput: ""
        };
    },
    created(){
        ApiService.getBlogs({params: {per_page: 5, entry: this.entrySlug}}).then(
            res => {
                this.blogs = res.data.data;
            }
        )
        ApiService.getCategories({params: {per_page: 5, entry: this.entrySlug}}).then(
            res => {
                this.categories = res.data;
            }
        )
    },
    methods: {
        searchBlogs(){
            if (this.searchInput){
                ApiService.searchBlogs({params: {per_page: 5, search: this.searchInput.trim().replaceAll(' ', '+')}})
                    .then(
                        res => {
                            this.searchResults = res.data.data;
                        }
                    )
                    .catch(
                        err => {
                            toastr.error("There was an issue, please try again later", "Error!", {preventDuplicates: true})
                        }
                    )
            } else {
                this.emptyResults();
            }
        },
        emptyResults(){
            this.searchResults = [];
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
    <div class="sidebar">
        <div class="row">
        <div class="col-lg-12 p-0">
            <div class="sidebar-item search">
                <form @submit.prevent="location.href = '/search/blogs?search=' + searchInput.replaceAll(' ', '+');">
                    <input type="text" class="searchText" placeholder="Search Blogs..." autocomplete="off" v-model="searchInput" @change="searchBlogs">
                </form>
                <div class="position-absolute bg-light w-100 p-3" style="z-index: 1000; border: 1px solid rgba(0,0,0,.1)" v-if="searchResults.length > 0">
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
                    <li v-for="blog in blogs"><a :href="'/' + blog.entry.slug + '/' + blog.slug">
                        <div class="row">
                            <div class="col-12">
                                <h5>{{blog.title}}</h5>
                                <small class="text-muted">{{blog.date}} | {{nFormatter(blog.views, 1)}} views</small>
                            </div>
                        </div>
                    </a></li>
                </ul>
            </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="sidebar-item categories">
            <div class="sidebar-heading">
                <h2>Categories</h2>
            </div>
            <div class="content">
                <ul>
                    <li v-for="category in categories">
                        <a :href="'/' + entrySlug + '/category/' + category" class="text-capitalize">- {{category}}</a>
                    </li>
                </ul>
            </div>
            </div>
        </div>
        <!--
        <div class="col-lg-12">
            <a href="https://cex.io/r/0/up145283861/0/" target="_blank"><div class="cex-sidemenu"></div></a>
        </div>
        -->
        </div>
    </div>
    `
})
new Vue({el: "#sidemenu"});