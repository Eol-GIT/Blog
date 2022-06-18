Vue.component('nav-bar', {
    props: ["active"],
    template: `
    <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand" href="/blog/"><img src="/static/blog/assets/images/logo-icon-blue.png" width="230px" alt="Eol Nuha Blogs Logo"/></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item" :class="{'active': active === 'home'}">
                <a class="nav-link" href="/blog/">Home</a>
              </li>
              <li class="nav-item" :class="{'active': active === 'entries'}">
                <a class="nav-link" href="/blog/tutorials/">Tutorials</a>
              </li>
              <li class="nav-item" :class="{'active': active === 'donate'}">
                <a class="nav-link" href="/support-donate/">Support/Donate</a>
              </li>
              <li class="nav-item" :class="{'active': active === 'contact'}">
                <a class="nav-link" href="/blog/contact-us">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `
})
new Vue({el: "#navbar"});