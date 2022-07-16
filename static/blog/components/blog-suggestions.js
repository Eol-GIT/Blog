Vue.component('blog-suggestions', {
    props: ["blogSlug", "entrySlug", "category"],
    data() {
        return {
            blogs: [],
            page: 1
        };
    },
    created(){
        this.getBlogs(this.page);
    },
    methods: {
        getBlogs(page){
            ApiService.getRecommendedBlogs({params: {
                blog: this.blogSlug, 
                entry: this.entrySlug, 
                category: this.category,
                page: page
            }})
            .then(
                res => {
                    this.blogs = res.data;
                    this.page = page;
                }
            );
        }
    },
    template: `
    <div>
        <div class="d-flex justify-content-between mb-3 flex-wrap">
            <h4 style="text-transform: uppercase;
            font-weight: 700;
            color: #09f;
            font-size: 16pt;
            letter-spacing: .2rem;">Recommended Blogs:</h4>
            <p><b>Page:</b> {{page}} / {{blogs.pages > 3 ? 3 : blogs.pages}}</p>
        </div>
        <div id="carouselExampleIndicators" class="carousel slide" data-interval="false">
            <ol class="carousel-indicators">
                <li
                    data-target="#carouselExampleIndicators" 
                    v-for="(p, index) in blogs.pages" 
                    v-if="index < 3"
                    :class="{'active': index == 0}"
                    :data-slide-to="p-1"
                    @click="getBlogs(p)"
                ></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item" v-for="(page, index) in blogs.pages" :class="{'active': index == 0}">
                    <div class="all-blog-posts mb-4">
                        <div class="row">
                            <div class="col-lg-6" v-for="(blog, index) in blogs.data" v-if="index < 4">
                                <a :href="'/' + entrySlug + '/' + blog.slug">
                                <div class="blog-post">
                                    <div class="down-content">
                                        <a  :href="'/' + entrySlug + '/category/' + blog.category"><span class="blog-category">{{blog.category}}</span></a>
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
        </div>
    </div>
    `
})
new Vue({el: "#blog-suggestions"});