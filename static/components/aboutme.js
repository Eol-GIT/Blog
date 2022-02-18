Vue.component('about-me', {
    template: `
        <div>
            <h3 id="about-me">{{i18next.t("aboutMeText")}}</h3>
            <hr class="devider">
            <div class="row">
                <div class="col-md">
                    <h2 class="text-primary">{{i18next.t("aSoftwareDeveloperText")}}</h2>
                    <p> {{i18next.t("aboutMeIntro")}} <a href="#contact">{{i18next.t("belowText")}}!</a></p> 
                    <a href="static/images/cv.pdf" download="cv"> 
                        <button class="btn btn-outline-primary">{{i18next.t("downloadResumeText")}}</button> 
                    </a> 
                </div>
                <div class="col-md text-center my-3"> <img src="static/images/profile-img.webp" class="about-me-image"></div>
            </div>
        </div>
    `
})
new Vue({el: "#about-me"});