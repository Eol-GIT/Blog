Vue.component('entries', {
    data() {
        return {
            page: 1,
            pageSize: 6,
            entries: []
        };
    },
    created(){
        this.paginatedEntries(this.page);
    },
    methods: {
        paginatedEntries(page){
            ApiService.getEntries({params: {page: page, per_page: this.pageSize}}).then(
                res => {
                    this.entries = res.data;
                }
            )
        }
    },
    template: `
    <div class="all-blog-posts">
      <div class="row">
        <div class="col-lg-6" v-for="entry in entries.data">
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
        <div class="col-lg-12 mb-4">
            <ul class="page-numbers">
                <li>
                    <a @click="paginatedEntries(entries.prev_num)" href="#" onclick="return false;" :class="{'disabled': !entries.has_prev}">
                        <i class="fa fa-angle-double-left"></i>
                    </a>
                </li>
                <li v-for="page in entries.pages" :class="{'active': page === entries.page}">
                    <a @click="paginatedEntries(page)" href="#" onclick="return false;">{{page}}</a>
                </li>
                <li>
                    <a @click="paginatedEntries(entries.next_num)" href="#" onclick="return false;" :class="{'disabled': !entries.has_next}">
                        <i class="fa fa-angle-double-right"></i>
                    </a>
                </li>
            </ul>
        </div>
      </div>
    </div>
    `
})
new Vue({el: "#entries"});