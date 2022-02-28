Vue.component('contact-us', {
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
                toastr.warning("We don't talk like that here", "Hey!", toastDefaults);
            } else {
                const btn = document.querySelector('#form-submit');
                btn.innerHTML = "Sending..";
                emailjs.sendForm('default_service', 'template_uvinz95', e.target, 'user_1wflK7WkbyVGouoePZaLU').then(res => {
                    setTimeout(() => {  
                        toastr.success("We will contact you shortly", "Email sent!", toastDefaults)
                        // Reset form field
                        this.firstName = '';
                        this.lastName = '';
                        this.email = '';
                        this.phone = '';
                        this.message = '';
                        btn.innerHTML = "Send Message";
                    }, 1000);
                }).catch(err => {
                    toastr.error("Please try again later", "There was an issue!", toastDefaults)
                    btn.innerHTML = "Send Message";
                })
            }
        },
    },
    template: `
    <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="down-contact">
              <div class="row">
                <div class="col-lg-8">
                  <div class="sidebar-item contact-form">
                    <div class="sidebar-heading">
                      <h2>Send us a message</h2>
                    </div>
                    <div class="content">
                      <form id="contact" @submit.prevent="sendEmail">
                        <div class="row">
                          <div class="col-md-6 col-sm-12">
                            <fieldset>
                              <input name="firstName" type="text" id="firstName" placeholder="Your first name" required="" v-model="firstName">
                            </fieldset>
                          </div>
                          <div class="col-md-6 col-sm-12">
                            <fieldset>
                              <input name="lastName" type="text" id="lastName" placeholder="Your last name" required="" v-model="lastName">
                            </fieldset>
                          </div>
                          <div class="col-md-6 col-sm-12">
                            <fieldset>
                              <input name="email" type="text" id="email" placeholder="Your email" required="" v-model="email">
                            </fieldset>
                          </div>
                          <div class="col-md-6 col-sm-12">
                            <fieldset>
                              <input name="phone" type="text" id="phone" placeholder="Your phone" required="" v-model="phone">
                            </fieldset>
                          </div>
                          <div class="col-lg-12">
                            <fieldset>
                              <textarea name="message" rows="6" id="message" placeholder="Your Message" required="" v-model="message"></textarea>
                            </fieldset>
                          </div>
                          <div class="col-lg-12">
                            <button type="submit" id="form-submit" class="main-button cursor-pointer">Send Message</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="sidebar-item contact-information">
                    <div class="sidebar-heading">
                      <h2>Contact Information</h2>
                    </div>
                    <div class="content">
                      <ul>
                        <li>
                          <h5>+383-49-793-208</h5>
                          <span>PHONE NUMBER</span>
                        </li>
                        <li>
                          <h5>info@eolnuha.com</h5>
                          <span>EMAIL ADDRESS</span>
                        </li>
                        <li>
                          <h5>Ferizaj, Kosovo</h5>
                          <span>ADDRESS</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-12">
            <div id="map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2947.725222480658!2d21.154120815297368!3d42.36969487918627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13547f2e7d2c49f3%3A0x295a5b1ccc583724!2sFerizaj!5e0!3m2!1sen!2s!4v1640646096429!5m2!1sen!2s" width="100%" height="450px" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
          </div>
          
        </div>
      </div>
    `
})
new Vue({el: "#contact-us"});