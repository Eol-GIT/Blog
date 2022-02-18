Vue.component('contact-form', {
    data() {
        return {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
        };
    },
    methods:{
        sendEmail(e) {
            if (curseWords.some(v => this.message.toLowerCase().includes(v))) {
                toastr.warning(i18next.t("curseMessage"), "Hey!", toastDefaults);
            } else {
                const btn = document.getElementById('button');
                btn.value = i18next.t("sendingText");
                emailjs.sendForm('default_service', 'template_uvinz95', e.target, 'user_1wflK7WkbyVGouoePZaLU', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    phone: this.phone,
                    message: this.message
                }).then(res => {
                    setTimeout(() => {  
                        toastr.success(i18next.t("weWillContactYouText"), i18next.t("emailSentText"), toastDefaults)
                        // Reset form field
                        this.firstName = '';
                        this.lastName = '';
                        this.email = '';
                        this.phone = '';
                        this.message = '';
                        btn.value = i18next.t("sendText");
                    }, 1000);
                }).catch(err => {
                    toastr.error(i18next.t("tryAgainLaterText"), i18next.t("thereWasAnIssueText"), toastDefaults)
                    btn.value = i18next.t("sendText");
                })
            }
        },
    },
    template: `
        <div>
            <h3>{{i18next.t("getInTouchText")}}</h3>
            <hr class="devider">
            <p>{{i18next.t("contactMeText")}}</p>
            <div class="row contact-border-right">
                <div class="col border-right border-primary text-center py-5 cursor-pointer"> <i class="fa fa-phone"></i>
                    <a href="tel:+38349793208" class="mail-to-link" data-toggle="tooltip" data-placement="bottom" title="${i18next.t("clickToMakeCallText")}">
                        <h4>+383 49 793 208</h4>
                    </a>
                </div>
                <div class="col border-right border-primary text-center py-5"> <i class="fa fa-envelope"></i>
                    <a href="mailto:info@eolnuha.com" class="mail-to-link" data-toggle="tooltip" data-placement="bottom" title="${i18next.t("clickToSendEmailText")}">
                        <h4>info@eolnuha.com</h4>
                    </a>
                </div>
                <div class="col text-center py-5 cursor-pointer" data-toggle="modal" data-target="#locationModal">
                    <i class="fa fa-map-marker"></i>
                    <h4 data-toggle="tooltip" data-placement="bottom" title="${i18next.t("clickToOpenMapText")}">Ferizaj, Kosovo</h4>
                </div>
            </div>
            <div class="row contact-border-bottom">
                <div class="col border-bottom border-primary text-center py-5 cursor-pointer"> <i class="fa fa-phone"></i>
                    <a href="tel:+38349793208" class="mail-to-link" data-toggle="tooltip" data-placement="bottom" title="${i18next.t("clickToMakeCallText")}">
                        <h4>+383 49 793 208</h4>
                    </a>
                </div>
                <div class="col border-bottom border-primary text-center py-5"> <i class="fa fa-envelope"></i>
                    <a href="mailto:info@eolnuha.com" class="mail-to-link" data-toggle="tooltip" data-placement="bottom" title="${i18next.t("clickToSendEmailText")}">
                        <h4>info@eolnuha.com</h4>
                    </a>
                </div>
                <div class="col text-center py-5" data-toggle="modal" data-target="#locationModal"><i class="fa fa-map-marker"></i>
                        <h4 data-toggle="tooltip" data-placement="bottom" title="${i18next.t("clickToOpenMapText")}">Ferizaj, Kosovo</h4>
                    </div>
            </div>
            <div class="wrapper margin-5-10">
                <h4 class="text m-0">{{i18next.t("sendAnEmailText")}}</h4>
                <form class="form p-3 m-0" id="form" @submit.prevent="sendEmail">
                    <div class="row">
                        <input class="col-md my-2 mr-2 form-control" placeholder="${i18next.t("firstNameText")}" name="firstName" id="firstName" required v-model="firstName">
                        <input class="col-md my-2 mr-2 form-control" placeholder="${i18next.t("lastNameText")}" name="lastName" id="lastName" required v-model="lastName">
                    </div>
                    <div class="row">
                        <input class="col-md my-2 mr-2 form-control" placeholder="${i18next.t("emailText")}" name="email" id="email" required v-model="email">
                        <input class="col-md my-2 mr-2 form-control" placeholder="${i18next.t("phoneText")}" name="phone" id="phone" required v-model="phone">
                    </div>
                    <div class="row">
                        <textarea placeholder="${i18next.t("yourMessageText")}" rows="3" name="message" id="message" minlength="15" class="my-2 mr-2 form-control" v-model="message"></textarea>
                    </div>
                    <div class="row">
                        <input class="btn btn-primary my-2 mr-2 w-100" type="submit" id="button" value="${i18next.t("sendText")}">
                    </div>
                </form>
            </div>
            <div class="modal modal fade" id="locationModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                    <div class="modal-header bg-transparent">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id="map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2947.725222480658!2d21.154120815297368!3d42.36969487918627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13547f2e7d2c49f3%3A0x295a5b1ccc583724!2sFerizaj!5e0!3m2!1sen!2s!4v1640646096429!5m2!1sen!2s" width="100%" height="450px" frameborder="0" style="border:0" allowfullscreen></iframe>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    `
});
new Vue({el: "#contact"});