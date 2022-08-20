Vue.component('skills', {
    data() {
        return {
            consent: getConsent() === `{"action":"accept","categories":"[\\"targeting\\"]"}`,
            color: 'black',
            category: '',
            skills: [],
            skillsList: [
                {language: "html", category: "frontend", percent: "100"},
                {language: "css", category: "frontend", percent: "95"},
                {language: "javascript", category: "frontend", percent: "90"},
                {language: "vue.js", category: "frontend", percent: "85"},
                {language: "bootstrap", category: "frontend", percent: "100"},
                {language: "react.js", category: "frontend", percent: "75"},
                {language: "less", category: "frontend", percent: "65"},
                {language: "sass", category: "frontend", percent: "70"},
                {language: "jquery", category: "frontend", percent: "90"},
                {language: "react-native", category: "frontend", percent: "55"},
                {language: "python", category: "backend", percent: "90"},
                {language: "django", category: "backend", percent: "85"},
                {language: "flask", category: "backend", percent: "85"},
                {language: "java", category: "backend", percent: "60"},
                {language: "postgresql", category: "backend", percent: "70"},
                {language: "groovy", category: "backend", percent: "60"},
                {language: "mysql", category: "backend", percent: "85"},
                {language: "c/c++", category: "backend", percent: "55"},
                {language: "moqui", category: "backend", percent: "80"},
                {language: "sqlite3", category: "backend", percent: "90"},
                {language: "git", category: "other", percent: "90"},
                {language: "linux server", category: "other", percent: "70"},
                {language: "xml", category: "other", percent: "80"},
                {language: "ms office", category: "other", percent: "100"},
                {language: "pygame", category: "other", percent: "95"},
                {language: "tensorflow", category: "other", percent: "60"},
                {language: "agile/scrum", category: "other", percent: "85"},
                {language: "opencv", category: "other", percent: "55"},
                {language: "oop", category: "other", percent: "90"},
                {language: "googling", category: "other", percent: "100"},
            ],
            loading: false,

        };
    },
    created(){
        eventBus.$on("changeConsent", (newValue) => {
            this.consent = newValue;
        });
        this.category = localStorage.getItem("skillCategory") ? localStorage.getItem("skillCategory") : "frontend"
        this.changeCategory(this.category)
    },
    methods: {
        changeCategory(category){
            if(this.consent){
                localStorage.setItem("skillCategory", category);
            }
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.category = category;
                this.skills = this.skillsList.filter(function (el) {
                    return el.category == category;
                });
            }, 500);
        }
    },
    template: `
        <div>
        <div class="section-title">
            <h1>{{i18next.t("whatICanDoText")}}</h1>
            <p>{{i18next.t("mainSkillsText")}}</p>
        </div>
        <div class="text-center skill-categories">
            <span class="border-bottom h4 px-2 cursor-pointer border-2" 
                :class="{'border-primary text-primary border-4': category === 'frontend', }" @click="changeCategory('frontend')">Front-end</span>
            <span class="border-bottom h4 px-2 cursor-pointer border-2" 
                :class="{'border-primary text-primary border-4': category === 'backend'}" @click="changeCategory('backend')">Back-end</span>
            <span class="border-bottom h4 px-2 cursor-pointer border-2" 
                :class="{'border-primary text-primary border-4': category === 'other'}" @click="changeCategory('other')">{{i18next.t('otherText')}}</span>
        </div>
        <div class="row">
            <div class="col-md pr-0">
            <div class="my-skills">
                <div class="my-skills-bar">
                <div class="text-center">
                <div class="loader" v-if="loading">
                    <div class="big-circle">
                        <div class="small-circle"></div>
                    </div>
                </div>
                </div>
                <div class="bar" v-for="skill in skills.slice(0, skills.length / 2)" v-if="!loading">
                    <div class="info">
                    <span class="text-uppercase">{{skill.language}}</span>
                    </div>
                    <div class="progress-line"><span class="language" :style="'--skill-level:' + skill.percent + '%'" :skill-content="skill.percent + '%'"></span></div>
                </div>
                </div>
            </div>
            </div>
            <div class="col-md pr-0"> 
            <div class="my-skills">
                <div class="my-skills-bar">
                    <div class="loader" v-if="loading">
                        <div class="big-circle">
                            <div class="small-circle"></div>
                        </div>
                    </div>
                    <div class="bar" v-for="skill in skills.slice(skills.length / 2, skills.length)" v-if="!loading">
                        <div class="info">
                        <span class="text-uppercase">{{skill.language}}</span>
                        </div>
                        <div class="progress-line"><span class="language" :style="'--skill-level:' + skill.percent + '%'" :skill-content="skill.percent + '%'"></span></div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    `
})
new Vue({el: "#skills"});