Vue.component('create-blog', {
    props: ["authors", "entries"],
    data() {
        return {
            title: "",
            category: "",
            entry: "",
            author: "",
            body: "",
        };
    },
    methods: {
        createBlog(){
            axios.post('/admin/create-blog', {
                title: this.title,
                category: this.category,
                author: this.author,
                entry: this.entry,
                body: this.body
            })
            .then(res => {
                this.title = '';
                this.category = '';
                this.author = '';
                this.entry = '';
                this.body = '';
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
                <input type="text" class="form-control" name="title" id="title" placeholder="Blog Title" v-model="title">
            </div>
            <div class="form-group">
                <label>Blog Category</label>
                <input type="text" class="form-control" name="category" id="category" placeholder="Blog Category" v-model="category">
            </div>
            <div class="form-group">
              <label>Blog Author</label>
              <select class="form-control" v-model="author">
                <option v-for="i in authors" :value="i.id">{{i.firstName}} {{i.lastName}}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Blog Entry</label>
              <select class="form-control" v-model="entry">
              <option v-for="item in entries" :value="item.id">{{item.title}}</option>
              </select>
            </div>
            <div class="form-group">
                <label>Blog Content</label>
                <textarea class="form-control" name="body" id="body" rows="3" v-model="body"></textarea>
                <small class="form-text text-muted">To write the blog content use markdown!</small>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
    `
})
new Vue({el: "#create-blog"});