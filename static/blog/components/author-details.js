Vue.component('author-details', {
    props: ["slug"],
    data() {
        return {
            author: {},
            blogs: {},
            pageSize: 12,
            buttonText: 'Load More'
        };
    },
    created(){
        this.getAuthorDetails();
        this.getAuthorBlogs(this.pageSize);
    },
    methods: {
        getAuthorDetails(){
            ApiService.getAuthorDetails(this.slug).then(
                res => {this.author = res.data}
            )
        },
        getAuthorBlogs(pageSize){
            this.buttonText = "Loading...";
            ApiService.getAuthorBlogs(this.slug, {params: {page: 1, per_page: pageSize}})
            .then(
                res => {
                    this.blogs = res.data;
                    this.pageSize = pageSize; 
                    this.buttonText = "Load More";
                }
            )
            .catch(
                err => {
                    toastr.error("There was an issue loading more blogs, please try again later", "Error!")
                    this.buttonText = "Load More";
                }
            )
        }
    },
    template: `
    <div>
    <div class="heading-page">
        <div class="author-profile-container">
            <div class="profile pb-0 mb-0">
                <div class="profile-image">
                    <img :src="'/static/' + author.img" :alt="author.slug" width="152" height="152">
                </div>

                <div class="profile-user-settings">
                    <h1 class="profile-user-name text-weight-bold">{{author.firstName}} {{author.lastName}}</h1> 
                </div>

                <div class="profile-stats">
                    <ul>
                        <li><span class="profile-stat-count">{{ blogs.total }}</span> <span v-if="blogs.total === 1">Blog</span><span v-else>Blogs</span></li>
                        <li><span class="profile-stat-count" data-toggle="tooltip" data-placement="bottom" :title="blogs.totalViews">{{ nFormatter(blogs.totalViews, 1) }}</span> Total Views</li>
                    </ul>
                </div>
                <div class="profile-bio">
                    <p class="pb-2">{{ author.body }}</p>
                    <span class="mr-4"><i class="fa fa-map-marker text-primary"></i> From: <strong>{{ author.location }} </strong></span><br class="show-on-mobile">
                    <span class="mr-4"><i class="fa fa-birthday-cake text-primary"></i> Joined on: <strong>{{author.date}} </strong></span><br class="show-on-mobile">
                    <span class="mr-4"><i class="fa fa-link text-primary"></i> <a :href="author.social">{{ author.slug }} </span></span>
                </div>
            </div>
            <!-- End of profile section -->
        </div>
        <!-- End of container -->
    </div>

    <section class="blog-posts grid-system mt-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                <div class="all-blog-posts">
                    <div class="row">
                        <div class="col-lg-4" v-for="blog in blogs.data">
                            <a :href="'/' + blog.entry.slug + '/' + blog.slug">
                                <div class="blog-post">
                                    <div class="down-content">
                                    <a  :href="'/' + blog.entry.slug + '/category/' + blog.category"><span class="blog-category">{{blog.category}}</span></a>
                                    <h3 class="text-dark font-weight-bold">{{blog.title}}</h3>
                                    <ul class="post-info">
                                        <li>{{blog.date}}</li>
                                    </ul>
                                    <hr class="devider">
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <button class="author-btn" v-if="blogs.has_next" @click="getAuthorBlogs(pageSize + 12)" id="load-blogs">{{buttonText}}</button>
        </div>
    </section>
    </div>
    `
})
new Vue({el: "#author-details"});