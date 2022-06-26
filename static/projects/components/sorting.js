Vue.component('sorting', {
    data() {
        return {
            array: [],
            datasetSize: 50,
            sortingSpeed: 50,
            lowestSortSpeed: 60,
            sidebar: 'none',
            sorts: [{name: 'Merge Sort', space: 'O(n log(n))', time: 'O(n log(n))'},
                    {name: 'Quick Sort', space: 'O(log(n))', time: 'O(n log(n))*'},
                    {name: 'Bubble Sort', space: 'O(1)', time: 'O(2)'}],
            selectedSort: '',
            activeLn: '',
            languages: ['en', 'sq'],
            consent: getConsent() === `{"action":"accept","categories":"[\\"targeting\\"]"}`
        };
    },
    created(){
        eventBus.$on("changeConsent", (newValue) => {
            this.consent = newValue;
        });
        this.activeLn = localStorage.getItem("ln") ? localStorage.getItem("ln") : 'en';
        var index = this.languages.indexOf(this.activeLn);
        this.languages.splice(index, 1);
        eventBus.$on("changeLanguage", (newValue) => {
            if (this.consent){
                localStorage.setItem("ln", newValue);
            }
            window.location.reload();
        });
    },
    mounted(){
        this.newArray();
    },
    methods:{
        newArray(){
            this.array = [];
            for (let i = 0; i < this.datasetSize ; i++) {
                this.array.push(randomInt(10, 500));
            }
        }, 
        mergeSort(){
            const animations = getMergeSortAnimations(this.array);
            toggleButtonsAndInputs(true);
            for (let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                const isColorChange = i % 3 !== 2;
                if (isColorChange) {
                    const [barOneId, barTwoId] = animations[i];
                    const barOneStyle = arrayBars[barOneId].style;
                    const barTwoStyle = arrayBars[barTwoId].style;
                    const color = i % 3 === 0 ? 'yellow' : 'rgba(8, 153, 255, 0.5)';
                    setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                    }, i * (this.lowestSortSpeed - this.sortingSpeed));
                } else {
                    setTimeout(() => {
                    const [barOneId, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneId].style;
                    barOneStyle.height = `${newHeight}px`;
                    if(i === animations.length - 1){toggleButtonsAndInputs(false)}
                    }, i * (this.lowestSortSpeed - this.sortingSpeed));
                }
            }
        },
        bubbleSort(){alert('Implementing Next!')},
        quickSort(){alert('Implementing Next!')}
    },
    watch: {
        datasetSize: {
          handler: function () {
            this.newArray();
          },
        },
      },
    template: `
    <div>
    <a id="home"><i class="fa fa-home" aria-hidden="true"></i></a>
    <span class="fas fa-sun position-fixed text-warning" onclick="darkModeToggle()" id="sun"></span>
    <span class="fas fa-moon position-fixed text-warning" onclick="darkModeToggle()" id="moon"></span>
    <div class="flag-menu-parent" tab-index="0" v-if="consent">
        <div class="flag-active">
            <img :src="'/static/portfolio/images/' + activeLn + '.png'" data-toggle="tooltip" data-placement="left" 
                :title="i18next.t(activeLn + 'Language')">
        </div>
        <div class="flag-menu">
            <img v-for="ln in languages" :src="'/static/portfolio/images/' + ln + '.png'" data-toggle="tooltip" data-placement="left" 
                :title="i18next.t(ln + 'Language')" @click="eventBus.$emit('changeLanguage', ln)">  
        </div>
    </div>
    <div class="container">
    <div class="sorting-box-shadow my-5 position-relative">
        <div class="sidebar" :style="'display: ' + sidebar">
            <i class="fa fa-arrow-left text-secondary h4 bars-icon" @click="sidebar = 'none'"></i><br>
            <h4 class="text-center">{{i18next.t("configText")}}</h4>
            <label class="mt-2">Sorting Algorithm</label>
            <select class="form-control" v-model="selectedSort">
                <option disabled value="">{{i18next.t("selectOneText")}}</option>
                <option v-for="sort in sorts" :value="sort">{{sort.name}}</option>
            </select>
            <label class="mt-2">Dataset Size</label><br>
            <input type="range" class="form-range w-100 bg-primary" v-model="datasetSize" min="5" max="50">
            <label class="mt-2">Sorting Speed</label><br>
            <input type="range" class="form-range w-100 bg-primary" v-model="sortingSpeed" min="1" max="50">
        </div>  
        <div class="border-bottom p-3">
            <i class="fa fa-bars bars-icon h4 m-0 p-3" @click="sidebar = 'block'"></i>
            <span class="h4">Sorting Visualizer</span>
            <p class="float-right p-3 sort-description" v-if="selectedSort">
                {{selectedSort.name}} - Time: {{selectedSort.time}} | Space: {{selectedSort.space}}
            </p>
        </div>
        <div class="p-3 bg-primary text-center">
            <button class="btn btn-outline-light" @click="newArray">Randomize</button>
            <button class="btn btn-outline-light" @click="mergeSort" v-if="selectedSort===sorts[0]">{{selectedSort.name}}</button>
            <button class="btn btn-outline-light" @click="quickSort" v-if="selectedSort===sorts[1]">{{selectedSort.name}}</button>
            <button class="btn btn-outline-light" @click="bubbleSort" v-if="selectedSort===sorts[2]">{{selectedSort.name}}</button>
            <button class="btn btn-outline-light" v-if="!selectedSort" @click="sidebar = 'block'">{{i18next.t("selectText")}} Sorting Algorithm</button>
        </div>
        <div class="array-container text-center p-3">
            <div class="array-bar" v-for="i in array" :style="'height:' + i + 'px;'"></div>
        </div>
    </div>
    </div>
    <div class="container" id="horizontal-ads">
      <horizontal-ads></horizontal-ads>
    </div>
    <p class="text-primary container mt-0">{{i18next.t("otherProjectsText")}}:</p>
    <div class="imageContainer mb-5 mt-4">
      <div class="project-image project-img-1" style="background-image: url('../static/portfolio/images/movie-freaks.webp')"
        onclick="projectRedirect('/projects/movie-freaks')">
      </div>

      <div class="project-image project-img-2" style="background-image: url('../static/portfolio/images/dino-game.webp')"
        onclick="projectRedirect('/projects/dino-game')">
      </div>

      <div class="project-image project-img-3" style="background-image: url('../static/portfolio/images/cyber-city.webp')"
        onclick="projectRedirect('/projects/cyber-city')">
      </div>
    </div>
    </div>`
});
new Vue({el: "#sorting"});