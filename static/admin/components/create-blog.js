Vue.component('create-blog', {
    data() {
        return {
            authors: [],
            entries: [],
            title: "",
            category: "",
            entry: "",
            author: "",
            body: "",
            keywords: ""
        };
    },
    created(){
        axios.get('/rest/s1/authors', {params: {per_page: 10000}}).then(
            res => {
                this.authors = res.data;
            }
        )
        axios.get('/rest/s1/entries', {params: {per_page: 10000}}).then(
            res => {
                this.entries = res.data.data;
            }
        )
    },
    methods: {
        createBlog(){
            axios.post('/admin/create-blog', {
                title: this.title,
                category: this.category,
                author: this.author,
                entry: this.entry,
                body: this.body,
                keywords: this.keywords
            })
            .then(res => {
                this.title = '';
                this.category = '';
                this.author = '';
                this.entry = '';
                this.body = '';
                this.keywords = '';
                toastr.success("Blog created successfully!", "Success!")
            })
            .catch(err => {
                toastr.error(err, "Error!")
            })
        }
    },
    template: `    
    <div>
        <div class="jumbotron jumbotron-fluid">
           <h1 class="text-center">Create Blog</h1>
        </div>
        <div class="container">
        <form method="POST" @submit.prevent="createBlog">
            <div class="form-group">
                <label>Blog Title</label>
                <input type="text" class="form-control" name="title" id="title" placeholder="Blog Title" v-model="title" required>
            </div>
            <div class="form-group">
                <label>Blog Category</label>
                <input type="text" class="form-control" name="category" id="category" placeholder="Blog Category" v-model="category" required>
            </div>
            <div class="form-group">
              <label>Blog Author</label>
              <select class="form-control" v-model="author" required>
                <option v-for="i in authors" :value="i.id">{{i.firstName}} {{i.lastName}}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Blog Entry</label>
              <select class="form-control" v-model="entry" required>
              <option v-for="i in entries" :value="i.id">{{i.title}}</option>
              </select>
            </div>
            <div class="form-group">
                <label>Blog Content</label>
                <textarea class="form-control" name="body" id="body" rows="3" v-model="body" required></textarea>
                <small class="form-text text-muted">To write the blog content use markdown!</small>
            </div>
            <div class="form-group">
                <label>Blog Keywords</label>
                <input type="text" class="form-control" name="keywords" id="keywords" placeholder="Blog Keywords" v-model="keywords" required>
                <small class="form-text text-muted">Keywords must be letters and numbers only and be separated by commas(,)</small>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
    `
})
new Vue({el: "#create-blog"});