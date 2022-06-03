Vue.component('footer-section', {
    data() {
        return {
          emailField: '',
        };
    },
    template: `
    <div class="container">
        <div class="row text-left">
            <div class="col-md-7">
                <div class="row">
                    <div class="col-md-4 mb-md-0 mb-4">
                        <h4 class="footer-heading">About</h4>
                        <ul class="list-unstyled">
                            <li><a href="/blog/about-us" class="d-block text-secondary">Out story</a></li>
                            <li><a href="#" class="d-block text-secondary">Awards</a></li>
                            <li><a href="/blog/authors" class="d-block text-secondary">Our Team</a></li>
                            <li><a href="#" class="d-block text-secondary">Career</a></li>
                        </ul>
                    </div>
                    <div class="col-md-4 mb-md-0 mb-4">
                        <h4 class="footer-heading">Company</h4>
                        <ul class="list-unstyled">
                            <li><a href="/blog/entries" class="d-block text-secondary">Our services</a></li>
                            <li><a href="#" class="d-block text-secondary">Clients</a></li>
                            <li><a href="/blog/contact-us" class="d-block text-secondary">Contact</a></li>
                            <li><a href="#" class="d-block text-secondary">Press</a></li>
                        </ul>
                    </div>
                    <div class="col-md-4 mb-md-0 mb-4">
                        <h4 class="footer-heading">Resources</h4>
                        <ul class="list-unstyled">
                            <li><a href="/blog/faq" class="d-block text-secondary">FAQ</a></li>
                            <li><a href="#" class="d-block text-secondary">Newsletter</a></li>
                            <li><a href="/blog/privacy-policy" class="d-block text-secondary">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-5 mb-md-0 mb-4">
                <h4 class="footer-heading">Subscribe</h4>
                <div class="subscribe-form">
                    <div class="form-group d-flex">
                        <input type="text" class="form-control rounded-left" placeholder="Enter email address" v-model="emailField">
                        <button type="submit" class="btn btn-primary" @click="toastr.success('Thank you for subscribing!', 'Email sent!'); emailField = ''">Subscribe</button>
                    </div>
                    <span class="subheading">Get digital marketing updates in your mailbox</span>
                </div>
            </div>
        </div>
        <div class="row mt-5 pt-4 border-top footer-icons">
            <div class="col-md-6 col-lg-8 mb-md-0 mb-4">
                <p class="copyright mb-0">Copyright ©<script>document.write(new Date().getFullYear());</script>2022 All rights reserved.</p>
            </div>
            <div class="col-md-6 col-lg-4 text-md-right">
                <ul class="social-icons border-bottom-0">
                    <li class="h2"><a href="https://www.facebook.com/eol.nuha/"><i class="fa fa-facebook"></i></a></li>
                    <li class="h2"><a href="https://twitter.com/EolNuhaBlogs"><i class="fa fa-twitter"></i></a></li>
                    <li class="h2"><a href="https://www.linkedin.com/in/eolnuha/"><i class="fa fa-linkedin"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
    `
})
new Vue({el: "#footer"});