Vue.component('blog-details', {
    props: ["blogSlug", "entrySlug"],
    data() {
        return {
            blog: {},
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
        };
    },
    created(){
        axios.get(`/rest/s1/blogs/${this.blogSlug}`).then(res => {this.blog = res.data})
    },
    mounted(){
      // Table of contents add and remove is-active
      var navs = document.querySelectorAll('.navigator-child');
        
      [].forEach.call(navs, function(nav){
        nav.addEventListener('click', () => {
          // remove is-active from all elements
          navs.forEach(function(nav) {
            nav.classList.remove('is-active');
          });
          
          // apply is-active only at selected item
          nav.classList.toggle('is-active');
        })
      })
    },
    methods:{
        sendEmail(e) {
            if (curseWords.some(v => this.message.toLowerCase().includes(v))) {
                toastr.warning("We don't talk like that here", "Hey!", toastDefaults);
            } else {
                const btn = document.querySelector('#form-submit');
                btn.innerHTML = "Sending..";
                emailjs.sendForm('default_service', 'template_vdpthsq', e.target, 'user_1wflK7WkbyVGouoePZaLU').then(res => {
                    setTimeout(() => {  
                        toastr.success("Thank you for your feedback", "Comment sent!", toastDefaults)
                        // Reset form field
                        this.firstName = '';
                        this.lastName = '';
                        this.email = '';
                        this.phone = '';
                        this.message = '';
                        btn.innerHTML = "Submit";
                    }, 1000);
                }).catch(err => {
                    toastr.error("Please try again later", "There was an issue!", toastDefaults)
                    btn.innerHTML = "Submit";
                })
            }
        },
    },
    template: `
    <div>
    <div class="heading-page header-text">
    <h6 class="pl-2 text-capitalize"><a :href="'/blog/entries/' + entrySlug">{{ entrySlug }}</a> > <a :href="blog.slug">{{blog.title}}</a></h6>
    <section class="page-heading">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-content">
              <h2>{{blog.title}}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>

    <section class="blog-posts grid-system">
    <div class="container">
      <div class="row">
        <div class="col-lg-10">
          <div class="all-blog-posts">
            <div class="row">
              <div class="col-lg-12">
                <div class="blog-post">
                  <div class="down-content">
                  <a :href="'/blog/entries/' + entrySlug + '/category/' + blog.category"><span>{{blog.category}}</span></a>
                    <h3>{{blog.title}}</h3>
                    <ul class="post-info">
                      <li>{{new Date(blog.date).toLocaleDateString()}}</li>
                    </ul>
                    <hr class="devider">
                   <div class="markdown" v-html="markdown(blog.body)"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-2" id="sidemenu">
          <sidemenu :entry-slug="entrySlug"></sidemenu>
        </div>
      </div>
      <div class="col-lg-12">
          <div class="sidebar-item submit-comment">
            <div class="sidebar-heading">
              <h2>Your feedback</h2>
            </div>
            <div class="content">
              <form id="contact" @submit.prevent="sendEmail">
                  <div class="row">
                      <div class="col-md-6 col-sm-12">
                      <fieldset>
                          <input name="firstName" type="text" id="firstName" placeholder="Your first name" required="" v-model="firstName">
                      </fieldset>
                      </div>
                      <div class="col-md-6 col-sm-12">
                      <fieldset>
                          <input name="lastName" type="text" id="lastName" placeholder="Your last name" required="" v-model="lastName">
                      </fieldset>
                      </div>
                      <div class="col-md-6 col-sm-12">
                      <fieldset>
                          <input name="email" type="text" id="email" placeholder="Your email" required="" v-model="email">
                      </fieldset>
                      </div>
                      <div class="col-md-6 col-sm-12">
                      <fieldset>
                          <input name="phone" type="text" id="phone" placeholder="Your phone" required="" v-model="phone">
                      </fieldset>
                      </div>
                      <div class="col-lg-12">
                      <fieldset>
                          <textarea name="message" rows="6" id="message" placeholder="Your Comment" required="" v-model="message" class="mb-0"></textarea>
                          <small>Send us your opinion on this blog!</small>
                      </fieldset>
                      <fieldset>
                          <input name="blog" type="hidden" id="blog" v-model="blog.slug">
                      </fieldset>
                      </div>
                      <div class="col-lg-12 mt-2">
                          <button type="submit" id="form-submit" class="main-button cursor-pointer">Submit</button>
                      </div>
                  </div>
              </form>
            </div>
          </div>
        </div>
    </div>
    </section>
    </div>
    `
})
new Vue({el: "#blog-details"});