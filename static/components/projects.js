Vue.component('projects', {
    data() {
        return {
          theme: "",
        };
    },
    created() {
        eventBus.$on("projectTheme", (newValue) => {
            this.theme = newValue;
        });
    },
    template: `
        <div>
        <h3 id="projects">{{i18next.t("bestProjectsText")}}</h3>
        <hr class="devider">
        <p>{{i18next.t("mainProjectsText")}}</p>
        <div class="row">
            <div class="col-md"> <a href="projects/sorting-visualizer">
                <div class="box-image"> <img src="static/images/sorting-visualizer1.webp" width="100%" loading="lazy" alt="Sorting Visualizer Image">
                    <div class="box-name">
                        <p>Sorting Visualizer</p>
                    </div>
                </div>
            </a></div>
            <div class="col-md"> <a href="projects/movie-freaks">
                    <div class="box-image"> <img src="static/images/movie-freaks.webp" width="100%" loading="lazy" alt="Movie Freaks Image">
                        <div class="box-name">
                            <p>Movie Freaks</p>
                        </div>
                    </div>
                </a></div>
            <div class="col-md"> <a href="projects/cyber-city">
                    <div class="box-image"> <img src="static/images/cyber-city.webp" width="100%" loading="lazy" alt="Cyber City Image">
                        <div class="box-name">
                            <p>Cyber City</p>
                        </div>
                    </div>
                </a></div>
            <div class="w-100"></div>
            <div class="col-md"> <a href="projects/tower-war">
                <div class="box-image"> <img src="static/images/tower-war-game.webp" width="100%" loading="lazy" alt="Tower War Game Image">
                    <div class="box-name">
                        <p>Tower War Game</p>
                    </div>
                </div>
            </a></div>
            <div class="col-md"> <a href="projects/dino-game">
                    <div class="box-image"> <img src="static/images/dino-game.webp" width="100%" loading="lazy" alt="Dino Game Image">
                        <div class="box-name">
                            <p>Dinosaur Game</p>
                        </div>
                    </div>
                </a></div>
            <div class="col-md"> <a href="projects/e-commerce">
                    <div class="box-image"> <img src="static/images/e-commerce.webp" width="100%" loading="lazy" alt="e-Commerce Image">
                        <div class="box-name">
                            <p>E-commerce Website</p>
                        </div>
                    </div>
                </a></div>
        </div>
        </div>
    `
})
new Vue({el: "#projects"});