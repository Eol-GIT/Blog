Vue.component('blog-stats', {
    data() {
        return {
            blogs: [],
            entries: []
        };
    },
    created(){
        ApiService.getBlogs().then(
            res => {
                this.blogs = res.data
            }
        )
        ApiService.getEntries().then(
            res => {
                this.entries = res.data;
            }
        )
    },
    template: `
    <div class="container mt-5">
        <hr>
        <h3 class="mt-5"></h3>
        <p>Helping thousands of people around the world, learn code everyday!</p>
        <div class="row p-2">
            <div class="col-md m-2 stats-col">
                <div>
                    <span>
                        Blogs
                    </span>
                </div>
                <div>
                    <h1>{{blogs.total}}</h1>
                </div>
                
            </div>
            <div class="col-md m-2 stats-col">
                <div>
                    <span>
                        Views
                    </span>
                </div>
                <div>
                    <h1 data-toggle="tooltip" data-placement="bottom" :title="blogs.totalViews">{{nFormatter(blogs.totalViews)}}</h1>
                </div>
                
            </div>
            <div class="col-md m-2 stats-col">
                <div>
                    <span>
                        Entries
                    </span>
                </div>
                <div>
                    <h1>{{entries.total}}</h1>
                </div>
                
            </div>
        </div>
    </div>
    `
})
new Vue({el: "#blog-stats"});