Vue.component('entries-home', {
    data() {
        return {
            entries: []
        };
    },
    created(){
        ApiService.getEntries({params: {per_page: 3}}).then(
            res => {
                this.entries = res.data.data;
            }
        )
    },
    template: `
    <div class="all-blog-posts">
    <div class="row">
    <div class="col-lg-12" v-for="entry in entries"><a :href="'/blog/entries/' + entry.slug">
        <div class="blog-post">
        <div class="blog-thumb">
            <img :src="'/static/' + entry.img" alt="">
        </div>
        <div class="down-content">
            <h4>{{entry.title}}</h4>
            <div v-html="markdown(entry.body)"></div>    
            </div>
        </div>
        </div>
        </a>
        </div>
    <div class="col-lg-12">
        <div class="main-button">
        <a href="/blog/entries">View All Entries</a>
        </div>
    </div>
    </div>
</div>
    `
})
new Vue({el: "#entries-home"});





