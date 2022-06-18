Vue.component('search-entries', {
    props: ["query"],
    data() {
        return {
            page: 1,
            pageSize: 6,
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
            ApiService.searchEntries({params: {
                page: page, 
                per_page: this.pageSize, 
                search: this.query
            }}).then(
                res => {
                    this.entries = res.data;
                    this.page = page;
                }
            )
        },
        getRecentEntries(){
            ApiService.getEntries({params: {page: 1, per_page: this.pageSize}}).then(
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
                        <h4>Tutorials by query</h4>
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
                            <div v-if="entries.data.length === 0" class="col-lg-12">
                                <h3>No tutorials have been found with the query: <i class="text-primary">{{query}}</i></h3>
                                <p>These are some of our most recent tutorials:</p>
                                <hr>
                            </div>
                            <div class="col-lg-6" v-for="entry in entries.data.length != 0 ? entries.data : recentEntries">
                                <a :href="'/' + entry.slug">
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
                            <div class="col-lg-12 mb-4" v-if="entries.data.length != 0">
                            <ul class="page-numbers">
                                <li>
                                    <a @click="getSearchResults(entries.prev_num)" href="#" onclick="return false;" :class="{'disabled': !entries.has_prev}">
                                        <i class="fa fa-angle-double-left"></i>
                                    </a>
                                </li>
                                <li v-for="page in entries.pages" :class="{'active': page === entries.page}">
                                    <a @click="getSearchResults(page)" href="#" onclick="return false;">{{page}}</a>
                                </li>
                                <li>
                                    <a @click="getSearchResults(entries.next_num)" href="#" onclick="return false;" :class="{'disabled': !entries.has_next}">
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