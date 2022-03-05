Vue.component('create-author', {
    data() {
        return {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            image: "",
            location: "",
            social: "",
            body: "",
            keywords: ""
        };
    },
    methods: {
        createAuthor(){
            axios.post('/admin/create-author', {
                firstName: this.firstName,
                lastName: this.lastName,
                username: this.username,
                email: this.email,
                password: this.password,
                img: this.image,
                location: this.location,
                social: this.social,
                body: this.body,
                keywords: this.keywords
            })
            .then(res => {
                this.firstName = '';
                this.lastName = '';
                this.username = '';
                this.email = '';
                this.password = '';
                this.image = '';
                this.location = '';
                this.social = '';
                this.body = '';
                this.keywords = '';
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
        <div class="container mb-5">
        <form method="POST" @submit.prevent="createAuthor">
            <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" name="firstName" id="firstname" placeholder="First Name" v-model="firstName" required>
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" name="lastName" id="lastName" placeholder="Last Name" v-model="lastName" required>
            </div>
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" name="username" id="username" placeholder="Username" v-model="username" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" name="email" id="email" placeholder="Email" v-model="email" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" name="password" id="password" placeholder="Password" v-model="password" required>
            </div>
            <div class="form-group">
                <label>Author Image</label>
                <input type="text" class="form-control" name="img" id="image" placeholder="Author image" v-model="image" required>
            </div>
            <div class="form-group">
                <label>Author Location</label>
                <input type="text" class="form-control" name="location" id="location" placeholder="Author Location" v-model="location" required>
            </div>
            <div class="form-group">
                <label>Author Social Link</label>
                <input type="text" class="form-control" name="social" id="social" placeholder="Author Social Link" v-model="social" required>
            </div>
            <div class="form-group">
                <label>Author Description</label>
                <textarea class="form-control" name="body" id="body" rows="3" v-model="body" required></textarea>
                <small class="form-text text-muted">To write the author description use markdown!</small>
            </div>
            <div class="form-group">
                <label>Author Keywords</label>
                <input type="text" class="form-control" name="keywords" id="keywords" placeholder="Author Keywords" v-model="keywords" required>
                <small class="form-text text-muted">Keywords must be letters and numbers only and be separated by commas(,)</small>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
    `
})
new Vue({el: "#create-author"});