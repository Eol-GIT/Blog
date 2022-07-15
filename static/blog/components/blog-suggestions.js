Vue.component('blog-suggestions', {
    props: ["blogSlug", "entrySlug", "category"],
    data() {
        return {
            blogs: [],
        };
    },
    created(){
        ApiService.getRecommendedBlogs({params: {
                blog: this.blogSlug, 
                entry: this.entrySlug, 
                category: this.category
            }})
            .then(
                res => {
                    this.blogs = res.data.data;
                }
            );
    },
    template: `
    <div>
        <h4 class="mb-3">Recommended blogs that may interest you:</h4>
        <div class="all-blog-posts">
            <div class="row">
                <div class="col-lg-6" v-for="(blog, index) in blogs" v-if="index < 4">
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
    `
})
new Vue({el: "#blog-suggestions"});