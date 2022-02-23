Vue.component('slider-blogs', {
    props: ["entries"],
    template: `
    <div class="main-banner header-text">
    <div class="container-fluid">
      <div class="owl-banner owl-carousel">
        <div class="item" v-for="entry in entries">
          <a :href="'/blog/entries/' + entry.slug">
            <img :src="'/static/' + entry.img" alt="">
            <div class="item-content">
              <div class="main-content">
                <h4>{{entry.title}}</h4>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
    `
})
new Vue({el: "#slider"});