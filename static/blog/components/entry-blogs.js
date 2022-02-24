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
            axios.get(`/rest/s1/entries/${this.entrySlug}/blogs`, {params: {page: page}}).then(
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
            <a :href="'/blog/entries/' + entrySlug + '/' + blog.slug">
            <div class="blog-post">
                <div class="down-content">
                <a  :href="'/blog/entries/' + entrySlug + '/category/' + blog.category"><span>{{blog.category}}</span></a>
                <h3 class="text-dark font-weight-bold">{{blog.title}}</h3>
                <ul class="post-info">
                    <li>{{blog.date}}</li>
                </ul>
                <hr class="devider">
                </div>
            </div>
            </a>
        </div>
        <div class="col-lg-12">
          <ul class="page-numbers">
            <li v-if="blogs.has_prev">
                <a @click="paginatedBlogs(blogs.prev_num)" href="#" onclick="return false;">
                    <i class="fa fa-angle-double-left"></i>
                </a>
            </li>
            <li v-for="page in blogs.pages" :class="{'active': page === blogs.page}">
                <a @click="paginatedBlogs(page)" href="#" onclick="return false;">{{page}}</a>
            </li>
            <li v-if="blogs.has_next">
                <a @click="paginatedBlogs(blogs.next_num)" href="#" onclick="return false;">
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