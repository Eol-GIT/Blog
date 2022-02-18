Vue.component('cyber-city', {
    data() {
        return {
            activeLn: '',
            languages: ['en', 'sq'],
            consent: getConsent() === `{"action":"accept","categories":"[\\"targeting\\"]"}`
        };
    },
    created(){
        eventBus.$on("changeConsent", (newValue) => {
            this.consent = newValue;
        });
        this.activeLn = localStorage.getItem("ln") ? localStorage.getItem("ln") : 'en';
        var index = this.languages.indexOf(this.activeLn);
        this.languages.splice(index, 1);
        eventBus.$on("changeLanguage", (newValue) => {
            if (this.consent){
                localStorage.setItem("ln", newValue);
            }
            window.location.reload();
        });
    },
    template: `
        <div>
        <a id="home"><i class="fa fa-home" aria-hidden="true"></i></a>
        <span class="fas fa-sun position-fixed text-warning" onclick="darkModeToggle()" id="sun"></span>
        <span class="fas fa-moon position-fixed text-warning" onclick="darkModeToggle()" id="moon"></span>
        <div class="flag-menu-parent" tab-index="0" v-if="consent">
            <div class="flag-active">
                <img :src="'/static/images/' + activeLn + '.png'" data-toggle="tooltip" data-placement="left" 
                    :title="i18next.t(activeLn + 'Language')">
            </div>
            <div class="flag-menu">
                <img v-for="ln in languages" :src="'/static/images/' + ln + '.png'" data-toggle="tooltip" data-placement="left" 
                    :title="i18next.t(ln + 'Language')" @click="eventBus.$emit('changeLanguage', ln)">  
            </div>
        </div>
        <div id="carouselExampleIndicators" class="carousel slide my-3" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
        </ol>
        <div class="carousel-inner container">
          <div class="carousel-item active">
            <img class="d-block w-100" src="../static/images/projects/cyber-black.png" alt="First slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="../static/images/projects/cyber-white.png" alt="Second slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="../static/images/projects/cyber-ipad.png" alt="Third slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="../static/images/projects/cyber-phone.png" alt="Third slide">
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <i class="fa fa-angle-left text-primary"></i>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <i class="fa fa-angle-right text-primary"></i>
          <span class="sr-only">Next</span>
        </a>
      </div>
      <div class="jumbotron jumbotron-fluid my-0">
        <div class="container">
          <h1 class="display-4">Cyber City</h1>
          <p class="lead">{{i18next.t("cyberCityIntro")}}</p>
          <p class="text-muted">{{i18next.t("linkToProjectText")}} <a href="http://cybercity-ks.com">{{i18next.t("hereText")}}</a></p>
          <p class="lead">{{i18next.t("technologiesUsedText", {projectName: "Cyber City"})}}:</p>
          <ul class="list-group">
            <li class="list-group-item bg-transparent">Python - {{i18next.t("pythonText", {extra: "(Flask)"})}}</li>
            <li class="list-group-item bg-transparent">SQlite3 - {{i18next.t("sqliteText")}}</li>
            <li class="list-group-item bg-transparent">Javascript - {{i18next.t("javascriptText", {extra: "(JQuery)"})}}</li>
            <li class="list-group-item bg-transparent">CSS - {{i18next.t("cssText")}}</li>
          </ul>
          <p class="text-primary">{{i18next.t("otherProjectsText")}}:</p>
        </div>
        <div class="imageContainer mt-5">
          <div class="project-image project-img-1" style="background-image: url('../static/images/movie-freaks.webp')"
            onclick="projectRedirect('/projects/movie-freaks')">
          </div>

          <div class="project-image project-img-2" style="background-image: url('../static/images/tower-war-game.webp')"
            onclick="projectRedirect('/projects/tower-war')">
          </div>

          <div class="project-image project-img-3" style="background-image: url('../static/images/sorting-visualizer1.webp')"
            onclick="projectRedirect('/projects/sorting-visualizer')">
          </div>
        </div>
      </div>
    </div>
    `
})
new Vue({el: "#cyber-city"});