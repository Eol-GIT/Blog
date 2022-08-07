Vue.component('footer-component', {
    data() {
        return {
            quote: "",
            author: "",
            ln: "",
            consent: getConsent() === `{"action":"accept","categories":"[\\"targeting\\"]"}`
        };
    },
    created(){
        eventBus.$on("changeConsent", (newValue) => {
            this.consent = newValue;
        });
        this.getQuote();
        this.ln = localStorage.getItem("ln") ? localStorage.getItem("ln") : 'en'
    },
    methods: {
        getQuote(){
            axios.get("https://api.quotable.io/random?tags=technology").then(
                (res) => {
                    this.quote = res.data.content;
                    this.author = res.data.author
                }
            )
        },
    },
    template: `
        <div>
        <div class="container">
        <div class="row pb-3">
            <div class="col-md text-center">
                <h4> {{i18next.t("myPortfolioText")}}</h4> <small class="text-secondary">eolnuha.com &copy;
                    copyright {{new Date().getFullYear()}}</small><br>
                    <span @click="eventBus.$emit('changeLanguage', 'en')" class="cursor-pointer h4 pb-2" 
                        :class="{'border-bottom': ln === 'en'}" v-if="consent"><img src="/static/portfolio/images/en.png" width="35px" alt="eng"></span>
                    <span @click="eventBus.$emit('changeLanguage', 'sq')" class="cursor-pointer h4 pb-2" 
                        :class="{'border-bottom': ln === 'sq'}" v-if="consent"><img src="/static/portfolio/images/sq.png" width="35px" alt="alb"></span>
            </div>
            <div class="col-md text-center">
                <h4> {{i18next.t("findMeOtherSocialMediaText")}}</h4> 
                <a href="https://www.facebook.com/EolNuhaBlogs"> <i class="fa fa-facebook"></i> </a> 
                <a href="https://twitter.com/EolNuhaBlogs"> <i class="fa fa-twitter"></i> </a> 
                <a href="https://github.com/EolNuha"> <i class="fa fa-github"></i> </a>
                <a href="https://www.linkedin.com/in/eolnuha/"> <i class="fa fa-linkedin"></i> </a>
                <a href="https://stackoverflow.com/users/14683130/eol-nuha"> <i class="fab fa-stack-overflow"></i> </a>
            </div>
        </div>
            <hr style="border-top: 0.2px solid rgba(255, 255, 255, 0.281); margin-left: -15px;">
            <div class="card text-white bg-dark">
                <h5 class="card-header text-primary">{{i18next.t("itsLiveText")}}</h5>
                <div class="card-body">
                    <h3 class="card-title"><strong>{{i18next.t("officialBlogText")}}</strong></h3>
                    <p class="card-text text-muted">{{i18next.t("blogDescriptionText")}}</p>
                    <a href="/blog" class="btn btn-primary">{{i18next.t("visitNowText")}}</a>
                </div>
            </div>
            <div class="row">
                <div class="col-lg p-0 mt-2">
                    <p class="text-primary text-left">Twitter Feed:</p>
                    <blockquote class="twitter-tweet" data-lang="en" data-theme="dark"><p lang="en" dir="ltr">Please join PI and use eolnuha as the person that invited you or click the link below. Thank you<a href="https://t.co/qPoDOZpD2c">https://t.co/qPoDOZpD2c</a></p>&mdash; Programming with Eol (@EolProgramming) <a href="https://twitter.com/EolNuhaBlogs/status/1461707863852781569?ref_src=twsrc%5Etfw">November 19, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                </div>
                <div class="col-lg atomi">
                    <small>{{i18next.t("randomQuoteText")}}:</small>
                    <div class="my-4">
                        <i class="h4 text-bold text-secondary">"{{quote}}"</i> <br>
                        <p class="text-right text-secondary"><i>~{{author}}</i></p>
                    </div>
                    <button class="btn btn-sm btn-primary mb-5" @click="getQuote">{{i18next.t("requestQuoteText")}}</button>
                    <a href="https://cex.io/r/0/up145283861/0/" target="_blank"><img src="https://cex.io/rb/CEX-1-336x280.png" alt="BuyBitcoinswithCreditCard" width="100%" height="280" border="0"></a>      
                </div>
            </div>
        </div>
    </div>
    `
})
new Vue({el: "#footer"});