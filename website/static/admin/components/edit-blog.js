Vue.component('edit-blog', {
    props: ["slug"],
    data() {
        return {
            blog: {},
            authors: [],
            entries: [],
        };
    },
    created(){
        this.getBlogDetails();
        ApiService.getAuthors({params: {per_page: 10000}}).then(
            res => {
                this.authors = res.data.data;
            }
        )
        ApiService.getEntries({params: {per_page: 10000}}).then(
            res => {
                this.entries = res.data.data;
            }
        )
    },
    methods: {
        getBlogDetails(){
            ApiService.getBlogDetails(this.slug)
                .then(res => {
                    this.blog = res.data
                })
        },
        updateBlog(){
            ApiService.updateBlog(this.slug, {
                title: this.blog.title,
                category: this.blog.category,
                author: this.blog.author.id,
                entry: this.blog.entry.id,
                body: this.blog.body,
                keywords: this.blog.keywords
            })
            .then(res => {
                this.getBlogDetails();
                toastr.success("Blog details updated successfully!", "Success!")
            })
            .catch(err => {
                toastr.error(err, "Error!")
            })
        }
    },
    template: `    
    <div>
        <div class="jumbotron jumbotron-fluid text-center">
            <h5>Blog:</h5>
            <h1>{{blog.title}}</h1>
        </div>
        <div class="container mb-5">
        <form method="POST" @submit.prevent="updateBlog">
            <div class="form-group">
                <label>Blog Title</label>
                <input type="text" class="form-control" name="title" id="title" placeholder="Blog Title" v-model="blog.title" required>
            </div>
            <div class="form-group">
                <label>Blog Category</label>
                <input type="text" class="form-control" name="category" id="category" placeholder="Blog Category" v-model="blog.category" required>
            </div>
            <div class="form-group">
            <label>Blog Author</label>
            <select class="form-control" v-model="blog.author.id" required>
                <option v-for="i in authors" :value="i.id" :selected="blog.author.id == i.id">{{i.firstName}} {{i.lastName}}</option>
            </select>
            </div>
            <div class="form-group">
            <label>Blog Entry</label>
            <select class="form-control" v-model="blog.entry.id" required>
            <option v-for="i in entries" :value="i.id" :selected="blog.entry.id == i.id">{{i.title}}</option>
            </select>
            </div>
            <div class="form-group">
                <label>Blog Content</label>
                <textarea class="form-control" name="body" id="body" rows="3" v-model="blog.body" required></textarea>
                <small class="form-text text-muted">To write the blog content use markdown!</small>
            </div>
            <div class="form-group">
                <label>Blog Keywords</label>
                <input type="text" class="form-control" name="keywords" id="keywords" placeholder="Blog Keywords" v-model="blog.keywords" required>
                <small class="form-text text-muted">Keywords must be letters and numbers only and be separated by commas(,)</small>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <h3 v-if="blog.body" class="mt-4">Blog Preview<hr></h3>
        <div class="markdown mb-5" v-html="markdown(blog.body)"></div>
        </div>
    </div>
    `
})
new Vue({el: "#edit-blog"});