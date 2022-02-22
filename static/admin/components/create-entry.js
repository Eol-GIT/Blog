Vue.component('create-entry', {
    data() {
        return {
            title: "",
            image: "",
            body: "",
            keywords: "",
        };
    },
    methods: {
        createEntry(){
            axios.post('/admin/create-entry', {
                title: this.title,
                img: this.image,
                body: this.body,
                keywords: this.keywords,
            })
            .then(res => {
                this.title = '';
                this.image = '';
                this.body = '';
                this.keywords = '';
                toastr.success("Entry created successfully!", "Success!")
            })
            .catch(err => {
                toastr.error(err, "Error!")
            })
        }
    },
    template: `    
    <div>
        <div class="jumbotron jumbotron-fluid">
           <h1 class="text-center">Create Entry</h1>
        </div>
        <div class="container">
        <form method="POST" @submit.prevent="createEntry">
            <div class="form-group">
                <label>Entry Title</label>
                <input type="text" class="form-control" name="title" id="title" placeholder="Entry Title" v-model="title">
            </div>
            <div class="form-group">
                <label>Entry Image Url</label>
                <input type="text" class="form-control" name="img" id="image" placeholder="Entry image" v-model="image">
            </div>
            <div class="form-group">
                <label>Entry Content</label>
                <textarea class="form-control" name="body" id="body" rows="3" v-model="body"></textarea>
                <small class="form-text text-muted">To write the Entry content use markdown!</small>
            </div>
            <div class="form-group">
                <label>Entry Keywords</label>
                <input type="text" class="form-control" name="keywords" id="keywords" placeholder="Entry Keywords" v-model="keywords" required>
                <small class="form-text text-muted">Keywords must be letters and numbers only and be separated by commas(,)</small>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
    `
})
new Vue({el: "#create-entry"});