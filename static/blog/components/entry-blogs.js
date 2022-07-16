Vue.component('entry-blogs', {
    props: ["entrySlug"],
    data() {
        return {
            page: 1,
            blogs: []
        };
    },
    created(){
        this.paginatedBlogs(this.page);
    },
    methods: {
        paginatedBlogs(page){
            ApiService.getEntryBlogs(this.entrySlug, {params: {page: page, per_page: 20}}).then(
                res => {
                    this.blogs = res.data;
                }
            )
        }
    },
    template: `
    <div class="all-blog-posts">
      <div class="row">
        <div class="col-lg-6" v-for="blog in blogs.data">
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
        <div class="col-lg-12 mb-4">
          <ul class="page-numbers">
            <li>
                <a @click="paginatedBlogs(blogs.prev_num)" href="#" onclick="return false;" :class="{'disabled': !blogs.has_prev}">
                    <i class="fa fa-angle-double-left"></i>
                </a>
            </li>
            <li v-for="page in blogs.page_range" :class="{'active': page === blogs.page}">
                <a @click="paginatedBlogs(page)" href="#" onclick="return false;">{{page}}</a>
            </li>
            <li>
                <a @click="paginatedBlogs(blogs.next_num)" href="#" onclick="return false;" :class="{'disabled': !blogs.has_next}">
                    <i class="fa fa-angle-double-right"></i>
                </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    `
})
new Vue({el: "#entry-blogs"});