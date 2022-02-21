Vue.component('create-author', {
    data() {
        return {
            firstName: "",
            lastName: "",
            image: "",
            body: ""
        };
    },
    methods: {
        createAuthor(){
            axios.post('/admin/create-author', {
                firstName: this.firstName,
                lastName: this.lastName,
                img: this.image,
                body: this.body
            })
            .then(res => {
                this.firstName = '';
                this.lastName = '';
                this.image = '';
                this.body = '';
                toastr.success("Author created successfully!", "Success!")
            })
            .catch(err => {
                toastr.error(err, "Error!")
            })
        }
    },
    template: `    
    <div>
        <div class="jumbotron jumbotron-fluid">
           <h1 class="text-center">Create Author</h1>
        </div>
        <div class="container">
        <form method="POST" @submit.prevent="createAuthor">
            <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" name="firstName" id="firstname" placeholder="First Name" v-model="firstName">
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" name="lastName" id="lastName" placeholder="Last Name" v-model="lastName">
            </div>
            <div class="form-group">
                <label>Author Image</label>
                <input type="text" class="form-control" name="img" id="image" placeholder="Author image" v-model="image">
            </div>
            <div class="form-group">
                <label>Author Description</label>
                <textarea class="form-control" name="body" id="body" rows="3" v-model="body"></textarea>
                <small class="form-text text-muted">To write the author description use markdown!</small>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
    `
})
new Vue({el: "#create-author"});