Vue.component('footer-section', {
    template: `
    <div class="container">
        <div class="row">
        <div class="col-lg-12">
            <ul class="social-icons">
                <li class="h2"><a href="https://www.facebook.com/eol.nuha/"><i class="fa fa-facebook"></i></a></li>
                <li class="h2"><a href="https://twitter.com/EolProgramming"><i class="fa fa-twitter"></i></a></li>
                <li class="h2"><a href="https://github.com/EolNuha"><i class="fa fa-github"></i></a></li>
                <li class="h2"><a href="https://www.linkedin.com/in/eolnuha/"><i class="fa fa-linkedin"></i></a></li>
            </ul>
        </div>
        <div class="col-lg-12">
            <div class="copyright-text">
            <p>EolNuha.Com &copy; Copyright {{new Date().getFullYear()}}</p>
            </div>
        </div>
        </div>
    </div>
    `
})
new Vue({el: "#footer"});