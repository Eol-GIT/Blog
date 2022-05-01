Vue.component('about-me', {
    template: `
        <div>
            <div class="section-title">
                <h1>{{i18next.t("aboutMeText")}}</h1>
                <p>{{i18next.t("aboutMeDescription")}}</p>
            </div>
            <div class="row">
                <div class="col-md d-flex flex-center-v">
                    <div>
                        <h2 class="text-center">{{i18next.t("aSoftwareDeveloperText")}}</h2>
                        <p> {{i18next.t("aboutMeIntro")}} <a href="#contact">{{i18next.t("belowText")}}!</a></p> 
                        <a href="static/portfolio/images/cv.pdf" download="cv" class="text-center d-block"> 
                            <button class="resume-btn">{{i18next.t("downloadResumeText")}}</button> 
                        </a> 
                    </div>
                </div>
                <div class="col-md d-flex flex-center my-3"> <img src="static/portfolio/images/boypc.png" style="max-width: 90%"></div>
            </div>
        </div>
    `
})
new Vue({el: "#about-me"});