Vue.component('search-authors', {
    props: ["query"],
    data() {
        return {
            page: 1,
            pageSize: 10,
            recentAuthors: [],
            authors: [],
        };
    },
    created(){
        this.getSearchResults(this.page);
        this.getRecentAuthors();
    },
    methods: {
        getSearchResults(page){
            axios.get(`/rest/s1/search/${this.query}/authors`, {params: {page: page, per_page: this.pageSize}})
            .then(
                res => {
                    this.authors = res.data;
                    this.page = page;
                }
            )
            .catch(
                err => {
                    toastr.error("There was an issue, please try again later", "Error!")
                }
            )
        },
        getRecentAuthors(){
            axios.get(`/rest/s1/authors`, {params: {page: 1, per_page: this.pageSize}}).then(
                res => {
                    this.recentAuthors = res.data.data;
                }
            )
        }
    },
    template: `
    <div>
    <div class="heading-page header-text">
        <section class="page-heading">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                    <div class="text-content">
                        <h4>Authors by query</h4>
                        <h2>{{query}}</h2>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    

    <div id="banner">
      <banner></banner>
    </div>


    <section class="blog-posts grid-system">
        <div class="container">
            <div class="row">
                <div class="col-lg-9" id="blog-entries">
                    <div class="all-blog-posts">
                        <div class="row">
                            <div v-if="authors.data.length === 0" class="col-lg-12">
                                <h3>No authors have been found with the query: <i class="text-primary">{{query}}</i></h3>
                                <p>These are some of our most recent authors:</p>
                                <hr>
                            </div>
                            <div class="col-lg-6" v-for="author in authors.data.length != 0 ? authors.data : recentAuthors">
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
                            <div class="col-lg-12" v-if="authors.data.length != 0">
                            <ul class="page-numbers">
                                <li v-if="authors.has_prev">
                                    <a @click="getSearchResults(authors.prev_num)" href="#" onclick="return false;">
                                        <i class="fa fa-angle-double-left"></i>
                                    </a>
                                </li>
                                <li v-for="page in authors.pages" :class="{'active': page === authors.page}">
                                    <a @click="getSearchResults(page)" href="#" onclick="return false;">{{page}}</a>
                                </li>
                                <li v-if="authors.has_next">
                                    <a @click="getSearchResults(authors.next_num)" href="#" onclick="return false;">
                                        <i class="fa fa-angle-double-right"></i>
                                    </a>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3" id="sidemenu">
                    <sidemenu></sidemenu>
                </div>
            </div>
        </div>
    </section>
    </div>
    `
})
new Vue({el: "#search-authors"});