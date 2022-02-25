Vue.component('entries', {
    data() {
        return {
            page: 1,
            entries: []
        };
    },
    created(){
        this.paginatedEntries(this.page);
    },
    methods: {
        paginatedEntries(page){
            axios.get('/rest/s1/entries', {params: {page: page}}).then(
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
        <div class="col-lg-12">
          <ul class="page-numbers">
            <li v-if="entries.has_prev">
                <a @click="paginatedEntries(entries.prev_num)" href="#" onclick="return false;">
                    <i class="fa fa-angle-double-left"></i>
                </a>
            </li>
            <li v-for="page in entries.pages" :class="{'active': page === entries.page}">
                <a @click="paginatedEntries(page)" href="#" onclick="return false;">{{page}}</a>
            </li>
            <li v-if="entries.has_next">
                <a @click="paginatedEntries(entries.next_num)" href="#" onclick="return false;">
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