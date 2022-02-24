Vue.component('login', {
    data() {
        return {
            email: "",
            password: "",
            loginText: "Log In"
        };
    },
    methods: {
        login(){
            this.loginText = 'Logging in...';
            axios.post(`/login`, {
                email: this.email,
                password: this.password,
            })
            .then(res => {
                this.loginText = 'Log In';
                var url = new URL(window.location.href);
                const nextUrl = url.searchParams.get("next");
                toastr.success("Login successful!", "Success!")
                setTimeout(() => {  
                    window.location.href = nextUrl ? nextUrl : '/admin';
                }, 500);
            })
            .catch(err => {
                this.loginText = 'Log In';
                toastr.error("Email or password is incorrect!", "Error!")
            })
        }
    },
    template: `    
    <div>
        <div class="jumbotron jumbotron-fluid text-center">
            <h1>Log In</h1>
        </div>
        <div class="container mb-5">
        <form method="POST" @submit.prevent="login">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" name="email" class="form-control" placeholder="Enter email" v-model="email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" name="password" class="form-control" placeholder="Password" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary px-4">{{loginText}}</button>
        </form>
        <p>Don't have an account? <a href="/admin/create-author">Sign Up</a>
        </div>
    </div>
    `
})
new Vue({el: "#login"});