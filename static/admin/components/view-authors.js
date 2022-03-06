Vue.component('view-authors', {
    data() {
        return {
            authors: [],
            page: 1
        };
    },
    created(){
        this.getAuthors(this.page);
    },
    methods: {
        getAuthors(page){
            axios.get('/rest/s1/authors', {params:{page: page, per_page: 20}})
                .then(res => {
                    this.authors = res.data;
                })
        },
        deleteAuthor(slug){
            var isConfirmed = confirm(`Are you sure you want to delete ${slug}?`)
            if (isConfirmed) {
                axios.post(`/rest/s1/authors/${slug}/delete`)
                    .then(res => {
                        this.getAuthors(this.page);
                        toastr.success("Author deleted successfully!", "Success!")
                    })
                    .catch(err => {
                        toastr.error(err, "Error!")
                    })
            }
        }
    },
    template: `    
    <div>
        <div class="jumbotron jumbotron-fluid">
        <h1 class="text-center">Authors</h1>
        </div>
        <div class="container">
            <table class="table container">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="author in authors.data">
                    <th scope="row">{{author.id}}</th>
                    <td>{{author.firstName}}</td>
                    <td>{{author.lastName}}</td>
                    <td>
                        <a :href="'/admin/authors/' + author.slug">
                            <button class="btn btn-sm btn-primary">Edit</button>
                        </a>
                    </td>
                    <td><button class="btn btn-sm btn-danger" @click="deleteAuthor(author.slug)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <nav>
                <ul class="pagination justify-content-center">
                    <li class="page-item" v-if="authors.has_prev">
                        <a class="page-link" @click="getAuthors(authors.prev_num)" href="#" onclick="return false;">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                    <li v-for="page in authors.pages" class="page-item" :class="{'active': page === authors.page}">
                        <a @click="getAuthors(page)" href="#" onclick="return false;" class="page-link">{{page}}</a>
                    </li>
                    <li class="page-item" v-if="authors.has_next">
                        <a class="page-link" @click="getAuthors(authors.next_num)" href="#" onclick="return false;">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    `
})
new Vue({el: "#view-authors"});