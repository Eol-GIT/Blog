Vue.component('create-entry', {
    data() {
        return {
            title: "",
            image: "",
            body: ""
        };
    },
    methods: {
        createEntry(){
            console.log(this.title, this.image, this.body)
            axios.post('/admin/create-entry', {
                title: this.title,
                img: this.image,
                body: this.body
            })
            .then(res => {
                this.title = '';
                this.image = '';
                this.body = '';
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
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
    `
})
new Vue({el: "#create-entry"});