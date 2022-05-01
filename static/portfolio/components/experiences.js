Vue.component('experiences', {
    template: `
        <div>
        <div class="section-title">
            <h1>{{i18next.t("experiencesText")}}</h1>
            <p>{{i18next.t("jobExperiencesText")}}</p>
        </div>
        <div class="about-us-card mt-5 row">
            <div class="job-pic-column d-flex flex-center">
                <img src="static/portfolio/images/weborigo.svg" alt="weborigo"/>
            </div>
            <div class="job-dis-column mx-2">
                <p class="card-name">{{i18next.t("softwareDeveloperText")}}</p>
                <p class="card-position">
                    <a href="https://weborigo.com" class="text-decoration-none">
                        Weborigo - Budapest, Hungary
                    </a>
                </p>
                <p class="card-position">April 2022 - Present</p>
                <p class="card-description">
                {{i18next.t("weborigo")}}
                </p>
            </div>
        </div>
        <div class="about-us-card mt-5 row">
            <div class="job-pic-column d-flex flex-center">
                <img src="static/portfolio/images/pythys.webp" alt="pythys"/>
            </div>
            <div class="job-dis-column mx-2 d-flex flex-center-v">
                <div>
                    <p class="card-name">{{i18next.t("softwareDeveloperText")}}</p>
                    <p class="card-position">
                        <a href="https://pythys.com" class="text-decoration-none">
                            Pythys Software - Kuwait, Kuwait
                        </a>
                    </p>
                    <p class="card-position">March 2021 - April 2022</p>
                    <p class="card-description">
                        {{i18next.t("pythys")}}
                    </p>
                </div>
            </div>
        </div>
        <div class="about-us-card mt-5 row">
            <div class="job-pic-column d-flex flex-center">
                <img src="static/portfolio/images/starlabs.png" alt="starlabs"/>
            </div>
            <div class="job-dis-column mx-2 d-flex flex-center-v">
                <div>
                    <p class="card-name">{{i18next.t("pythonDeveloperText")}} (Intern)</p>
                    <p class="card-position">
                        <a href="https://starlabs.dev" class="text-decoration-none">
                            StarLabs Inc. - Pristina, Kosovo
                        </a>
                    </p>
                    <p class="card-position">Feb 2021 - May 2021</p>
                    <p class="card-description">
                        {{i18next.t("starlabs")}}
                    </p>
                </div>
            </div>
        </div>
        <div class="about-us-card mt-5 row">
            <div class="job-pic-column d-flex flex-center">
                <img src="static/portfolio/images/upwork1.webp" alt="upwork"/>
            </div>
            <div class="job-dis-column mx-2 d-flex flex-center-v">
                <div>
                    <p class="card-name">{{i18next.t("softwareDeveloperText")}} (Freelance)</p>
                    <p class="card-position">
                        <a href="https://upwork.com" class="text-decoration-none">
                            UpWork - Worldwide
                        </a>
                    </p>
                    <p class="card-position">June 2020 - Jan 2021</p>
                    <p class="card-description">
                    {{i18next.t("upwork")}}
                    </p>
                </div>
            </div>
        </div>
        </div>
    `
})
new Vue({el: "#experiences"});