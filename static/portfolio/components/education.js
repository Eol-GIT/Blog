Vue.component('education', {
    template: `
        <div>
        <h3>{{i18next.t("educationText")}}</h3>
        <hr class="devider"><br> 
        <div class="row">
            <div class="col-md">
                <small class="text-primary">Sep 2018 - May 2021</small>
                <h3 class="text-primary">{{i18next.t("gymnasiumOfNaturalSciencesText")}} - "Kuvendi i Arberit"</h3>
                <p class="text-secondary"><strong>Kuvendi I Arberit</strong> {{i18next.t("kuvendiArberitIntro")}}</p>
            </div>
            <div class="col-md">    
                <small class="text-primary">Oct 2021 - {{i18next.t("presentText")}}</small>
                <h3 class="text-primary">{{i18next.t("ubtText")}} - UBT</h3>
                <p class="text-secondary"><strong>UBT</strong> {{i18next.t("ubtIntro")}}
                </p>
            </div>
        </div>
    </div>
    `
})
new Vue({el: "#education"});