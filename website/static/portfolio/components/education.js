Vue.component('education', {
    template: `
        <div>
        <div class="section-title">
            <h1>{{i18next.t("educationText")}}</h1>
            <p>{{i18next.t("educationDescriptionText")}}</p>
        </div>
        <div class="row">
            <div class="col-md d-flex flex-center">
                <img src="static/portfolio/images/boyflag.png" style="max-width: 90%" alt="boyflag"/>
            </div>
            <div class="col-md d-flex flex-center-v">
                <div>
                    <h2 class="text-center">{{i18next.t("ubtText")}} - UBT</h2>
                    <p style="font-size: 16px"><strong>UBT</strong> {{i18next.t("ubtIntro")}}</a></p> 
                    <a href="https://www.ubt-uni.net/sq/ballina/" target="_blank" class="text-center d-block"> 
                        <button class="resume-btn">{{i18next.t("visitWebText")}}</button> 
                    </a> 
                </div>
            </div>
        </div>
    </div>
    `
})
new Vue({el: "#education"});