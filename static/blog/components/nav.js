Vue.component('nav-bar', {
    props: ["active"],
    data() {
        return {
            darkMode: false
        }
    },
    created() {
      if (localStorage.getItem("darkmode")){
          if (localStorage.getItem("darkmode") === 'true'){
              this.darkMode = true;
              this.dark();
          }
          if (localStorage.getItem("darkmode") === 'false'){
              this.darkMode = false;
              this.light();
          }
      } else {
        localStorage.setItem("darkmode", "false");
        this.light();
      }
    },
    methods: {
      dark(){
        this.darkMode = true;
        localStorage.setItem("darkmode", "true");
        body = document.querySelector('#body');
        body.classList.add("dark-mode-body");
      },
      light(){
        this.darkMode = false;
        localStorage.setItem("darkmode", "false");
        body = document.querySelector('#body');
        body.classList.remove("dark-mode-body");
      }
    },
    template: `
<nav class="navbar navbar-expand-lg">
	<div class="container">
		<a class="navbar-brand" href="/blog/"
			><img
				class="header-logo"
				src="/static/blog/assets/images/logo-icon-blue.png"
				width="230px"
				alt="Eol Nuha Blogs Logo"
		/></a>
		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarResponsive"
			aria-controls="navbarResponsive"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
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
				<li class="nav-item cursor-pointer" v-if="darkMode" @click="light" style="margin-top: -5px;">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
						<g id="sun">
							<path
								d="M50,31.7c-9.9,0-18,8.1-18,18s8.1,18,18,18s18-8.1,18-18S59.9,31.7,50,31.7z M50,65.7c-8.8,0-16-7.2-16-16s7.2-16,16-16
                 s16,7.2,16,16S58.8,65.7,50,65.7z"
							/>
							<g class="odd">
								<line fill="none" stroke="#fcd000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="50" y1="71.6" x2="50" y2="80.9"/>
								<line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="50" y2="18.4" x2="50" y1="27.7"/>
								<line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="28" y1="49.7" x2="18.7" y2="49.7"/>
								<line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x2="81.3" y1="49.7" x1="72" y2="49.7"/>
							</g>
							<g class="even">
								<line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="34.2" y1="65.1" x2="27.6" y2="71.6"/>
								<line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x2="71.8" y2="27.4" x1="65.2" y1="34"/>
								<line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="34.2" y1="34" x2="27.6" y2="27.4"/>
								<line fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x2="71.8" y2="71.7" x1="65.2" y1="65.1"/>
							</g>
						</g>
					</svg>
				</li>
        <li class="nav-item cursor-pointer" v-if="!darkMode" @click="dark">
          <div class="d-flex align-items-center justify-content-center" style="line-height: 0px !important;">
            <div class="position-relative">
              <div id="cloud"></div>
              <div class="star star-1"></div>
              <div class="star star-2"></div>
              <i class="fas fa-moon"></i>
              <div id="shadow"></div>
            </div>
          </div>
        </li>
			</ul>
		</div>
	</div>
</nav>
    `
})
new Vue({el: "#navbar"});