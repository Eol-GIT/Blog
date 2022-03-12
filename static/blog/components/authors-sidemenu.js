Vue.component('sidemenu', {
    data() {
        return {
            authors: [],
            topAuthors: [],
            searchResults: [],
            searchInput: ""
        };
    },
    created(){
        ApiService.getAuthors({params: {per_page: 5}}).then(
            res => {
                this.authors = res.data.data;
            }
        )
        ApiService.getTopAuthors({params: {per_page: 5}}).then(
            res => {
                this.topAuthors = res.data;
            }
        )
    },
    methods: {
        searchAuthors(){
            if (this.searchInput){
                ApiService.searchAuthors({params: {
                    per_page: 5,
                    search: this.searchInput.trim().replaceAll(' ', '+')
                }})
                .then(
                    res => {
                        this.searchResults = res.data.data;
                    }
                )
                .catch(
                    err => {
                        toastr.error("There was an issue, please try again later", "Error!", {preventDuplicates: true})
                    }
                )
            } else {
                this.emptyResults();
            }
        },
        emptyResults(){
            this.searchResults = [];
        }
    },
    watch: {
        searchInput: {
          handler: function () {
              this.searchAuthors();
          },
        },
    },
    template: `
    <div class="sidebar">
        <div class="row">
        <div class="col-lg-12 p-0">
            <div class="sidebar-item search">
                <form @submit.prevent="location.href = '/blog/search/authors?search=' + searchInput.replaceAll(' ', '+');">
                    <input type="text" class="searchText" placeholder="Search Authors..." autocomplete="off" v-model="searchInput" @change="searchAuthors">
                </form>
                <div class="position-absolute bg-light w-100 p-3" style="z-index: 1000; border: 1px solid rgba(0,0,0,.1)" v-if="searchResults.length > 0">
                    <div v-for="result in searchResults">
                        <a :href="'/blog/' + result.slug" class="text-dark">
                            <div class="d-flex">
                                <div class="w-25 mr-2">
                                    <img :src="'/static/' + result.img" :alt="result.slug" class="w-100">
                                </div>
                                <div>
                                    <h5>{{result.firstName}} {{result.lastName}}</h5>
                                    <small class="text-muted">{{nFormatter(result.views, 1)}} views</small>
                                </div>
                            </div>
                        </a>
                        <hr>
                    </div>
                    <a :href="'/blog/search/authors?search=' + searchInput.replaceAll(' ', '+')"><button class="btn btn-sm btn-primary w-100">View All</button></a>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="sidebar-item recent-posts">
            <div class="sidebar-heading">
                <h2>Recent Authors</h2>
            </div>
            <div class="content">
                <ul>
                <li v-for="author in authors"><a :href="'/blog/' + author.slug">
                    <div class="row">
                        <div class="col-12">
                            <div class="d-flex">
                                <div class="w-25 mr-2">
                                    <img :src="'/static/' + author.img" :alt="author.slug" class="w-100">
                                </div>
                                <div>
                                    <h5>{{author.username}}</h5>
                                    <small class="text-muted">{{nFormatter(author.views, 1)}} views</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </a></li>
                </ul>
            </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="sidebar-item recent-posts">
            <div class="sidebar-heading">
                <h2>Top Authors</h2>
            </div>
            <div class="content">
                <ul>
                <li v-for="author in topAuthors"><a :href="'/blog/' + author.slug">
                    <div class="row">
                        <div class="col-12">
                            <div class="d-flex">
                                <div class="w-25 mr-2">
                                    <img :src="'/static/' + author.img" :alt="author.slug" class="w-100">
                                </div>
                                <div>
                                    <h5>{{author.firstName}} {{author.lastName}}</h5>
                                    <small class="text-muted">{{nFormatter(author.views, 1)}} views</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </a></li>
                </ul>
            </div>
            </div>
        </div>
        </div>
    </div>
    `
})
new Vue({el: "#sidemenu"});