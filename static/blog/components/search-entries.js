Vue.component('search-entries', {
    props: ["query"],
    data() {
        return {
            page: 1,
            pageSize: 10,
            recentEntries: [],
            entries: [],
        };
    },
    created(){
        this.getSearchResults(this.page);
        this.getRecentEntries();
    },
    methods: {
        getSearchResults(page){
            axios.get(`/rest/s1/search/${this.query}/entries`, {params: {page: page, per_page: this.pageSize}}).then(
                res => {
                    this.entries = res.data;
                    this.page = page;
                }
            )
        },
        getRecentEntries(){
            axios.get(`/rest/s1/entries`, {params: {page: 1, per_page: this.pageSize}}).then(
                res => {
                    this.recentEntries = res.data.data;
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
                        <h4>Entries by query</h4>
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
                            <div v-if="entries.data.length === 0" class="col-lg-12">
                                <h3>No entries have been found with the query: <i class="text-primary">{{query}}</i></h3>
                                <p>These are some of our most recent entries:</p>
                                <hr>
                            </div>
                            <div class="col-lg-6" v-for="entry in entries.data.length != 0 ? entries.data : recentEntries">
                                <a :href="'/blog/entries/' + entry.slug">
                                <div class="blog-post">
                                    <div class="blog-thumb">
                                    <img :src="'/static/' + entry.img" :alt="entry.slug">
                                    </div>
                                    <div class="down-content">
                                    <h4>{{entry.title}}</h4>
                                    <div v-html="markdown(entry.body)"></div>
                                    </div>
                                </div>
                                </a>
                            </div>
                            <div class="col-lg-12" v-if="entries.data.length != 0">
                            <ul class="page-numbers">
                                <li v-if="entries.has_prev">
                                    <a @click="getSearchResults(entries.prev_num)" href="#" onclick="return false;">
                                        <i class="fa fa-angle-double-left"></i>
                                    </a>
                                </li>
                                <li v-for="page in entries.pages" :class="{'active': page === entries.page}">
                                    <a @click="getSearchResults(page)" href="#" onclick="return false;">{{page}}</a>
                                </li>
                                <li v-if="entries.has_next">
                                    <a @click="getSearchResults(entries.next_num)" href="#" onclick="return false;">
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
new Vue({el: "#search-entries"});