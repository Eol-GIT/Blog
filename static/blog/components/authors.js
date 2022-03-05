Vue.component('authors', {
    data() {
        return {
            page: 1,
            pageSize: 6,
            authors: []
        };
    },
    created(){
        this.paginatedAuthors(this.page);
    },
    methods: {
        paginatedAuthors(page){
            axios.get('/rest/s1/authors', {params: {page: page, per_page: this.pageSize}}).then(
                res => {
                    this.authors = res.data;
                }
            )
        }
    },
    template: `
    <div class="all-blog-posts">
      <div class="row">
        <div class="col-lg-6" v-for="author in authors.data">
            <a :href="'/blog/' + author.slug">
            <div class="blog-post">
                <div class="blog-thumb">
                <img :src="'/static/' + author.img" :alt="author.slug">
                </div>
                <div class="down-content">
                <h4>{{author.username}}</h4>
                <div v-html="markdown(author.body)"></div>
                </div>
            </div>
            </a>
        </div>
        <div class="col-lg-12">
            <ul class="page-numbers">
                <li>
                    <a @click="paginatedAuthors(authors.prev_num)" href="#" onclick="return false;" :class="{'disabled': !authors.has_prev}">
                        <i class="fa fa-angle-double-left"></i>
                    </a>
                </li>
                <li v-for="page in authors.pages" :class="{'active': page === authors.page}">
                    <a @click="paginatedAuthors(page)" href="#" onclick="return false;">{{page}}</a>
                </li>
                <li>
                    <a @click="paginatedAuthors(authors.next_num)" href="#" onclick="return false;" :class="{'disabled': !authors.has_next}">
                        <i class="fa fa-angle-double-right"></i>
                    </a>
                </li>
            </ul>
        </div>
      </div>
    </div>
    `
})
new Vue({el: "#authors"});