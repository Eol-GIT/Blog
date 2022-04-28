Vue.component('experiences', {
    template: `
        <div>
        <h3>{{i18next.t("experiencesText")}}</h3>
        <hr class="devider">
        <p style="margin: 0;">{{i18next.t("jobExperiencesText")}}</p> <small style="color: #0099ff;">2020 - {{i18next.t("ongoingText")}}</small>
        <div class="experience-box">
            <div class="row">
                <div class="job-pic-column d-flex flex-center"> <img src="static/portfolio/images/weborigo.svg" alt="weborigo"></div>
                <div class="job-dis-column d-flex flex-center-v">
                    <div>
                        <h2> {{i18next.t("softwareDeveloperText")}}</h2> <a href="https://weborigo.com" class="text-decoration-none">
                            <h5 class="text-primary">Weborigo - Budapest, Hungary</h5>
                        </a> <small class="text-secondary">April 2022 - {{i18next.t("presentText")}}</small>
                        <p> • {{i18next.t("weborigo0")}}<br> • {{i18next.t("weborigo1")}} <br> • {{i18next.t("weborigo2")}}<br> • {{i18next.t("weborigo3")}}</p>
                    </div>
                </div>
            </div>
            <hr class="dark-mode-divider">
            <div class="row">
                <div class="job-pic-column d-flex flex-center"> <img src="static/portfolio/images/pythys.webp" alt="Pythys"></div>
                <div class="job-dis-column d-flex flex-center-v">
                    <div>
                        <h2> {{i18next.t("softwareDeveloperText")}}</h2> <a href="https://pythys.com" class="text-decoration-none">
                            <h5 class="text-primary">Pythys Software - Kuwait, Kuwait</h5>
                        </a> <small class="text-secondary">March 2021 - April 2022</small>
                        <p> • {{i18next.t("pythys0")}}<br> • {{i18next.t("pythys1")}} <br> • {{i18next.t("pythys2")}}</p>
                    </div>
                </div>
            </div>
            <hr class="dark-mode-divider">
            <div class="row">
                <div class="job-pic-column d-flex flex-center"> <img src="static/portfolio/images/starlabs.webp" alt="starlabs"></div>
                <div class="job-dis-column d-flex flex-center-v">
                    <div>
                        <h2> {{i18next.t("pythonDeveloperText")}} (Intern)</h2> <a href="https://starlabs.dev" class="text-decoration-none">
                            <h5 class="text-primary">StarLabs Inc. - Pristina, Kosovo</h5>
                        </a> <small class="text-secondary">Feb 2021 - May 2021</small>
                        <p> • {{i18next.t("starlabs0")}} <br> • {{i18next.t("starlabs1")}}</p>
                    </div>
                </div>
            </div>
            <hr class="dark-mode-divider">
            <div class="row">
                <div class="job-pic-column d-flex flex-center"> <img src="static/portfolio/images/upwork1.webp" class="w-100" alt="upwork"></div>
                <div class="job-dis-column d-flex flex-center-v">
                    <div>
                        <h2> {{i18next.t("softwareDeveloperText")}} (Freelance)</h2>
                        <h5 class="text-primary"><a href="https://upwork.com">UpWork</a>, <a
                                href="https://piecex.com">PieceX</a></h5> <small class="text-secondary">June 2020 - Jan
                            2021</small>
                        <p> • {{i18next.t("upwork0")}}<br> • {{i18next.t("upwork1")}}<br> • {{i18next.t("upwork2")}}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `
})
new Vue({el: "#experiences"});