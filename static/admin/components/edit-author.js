Vue.component('edit-author', {
    props: ["slug"],
    data() {
        return {
            author: {}
        };
    },
    created(){
        this.getAuthorDetails();
    },
    methods: {
        getAuthorDetails(){
            axios.get(`/rest/s1/authors/${this.slug}`)
                .then(res => {
                    this.author = res.data
                })
        },
        updateAuthor(){
            axios.post(`/rest/s1/authors/${this.slug}/update`, {
                firstName: this.author.firstName,
                lastName: this.author.lastName,
                img: this.author.img,
                location: this.author.location,
                social: this.author.social,
                body: this.author.body,
                keywords: this.author.keywords
            })
            .then(res => {
                this.getAuthorDetails();
                toastr.success("Author details updated successfully!", "Success!")
            })
            .catch(err => {
                toastr.error(err, "Error!")
            })
        }
    },
    template: `    
    <div>
        <div class="jumbotron jumbotron-fluid text-center">
            <h5>Author:</h5>
            <h1>{{author.firstName}} {{author.lastName}}</h1>
        </div>
        <div class="container mb-5">
        <form method="POST" @submit.prevent="updateAuthor">
            <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" name="firstName" id="firstname" placeholder="First Name" v-model="author.firstName" required>
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" name="lastName" id="lastName" placeholder="Last Name" v-model="author.lastName" required>
            </div>
            <div class="form-group">
                <label>Author Image</label>
                <input type="text" class="form-control" name="img" id="image" placeholder="Author image" v-model="author.img" required>
            </div>
            <div class="form-group">
                <label>Author Location</label>
                <input type="text" class="form-control" name="location" id="location" placeholder="Author Location" v-model="author.location" required>
            </div>
            <div class="form-group">
                <label>Author Social Link</label>
                <input type="text" class="form-control" name="social" id="social" placeholder="Author Social Link" v-model="author.social" required>
            </div>
            <div class="form-group">
                <label>Author Description</label>
                <textarea class="form-control" name="body" id="body" rows="3" v-model="author.body" required></textarea>
                <small class="form-text text-muted">To write the author description use markdown!</small>
            </div>
            <div class="form-group">
                <label>Author Keywords</label>
                <input type="text" class="form-control" name="keywords" id="keywords" placeholder="Author Keywords" v-model="author.keywords" required>
                <small class="form-text text-muted">Keywords must be letters and numbers only and be separated by commas(,)</small>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
    `
})
new Vue({el: "#edit-author"});