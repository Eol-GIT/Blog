Vue.component('view-entries', {
    data() {
        return {
            entries: [],
            page: 1
        };
    },
    created(){
        this.getEntries(this.page);
    },
    methods: {
        getEntries(page){
            axios.get('/rest/s1/entries', {params:{page: page, per_page: 20}})
                .then(res => {
                    this.entries = res.data;
                })
        },
        deleteEntry(slug){
            axios.post(`/rest/s1/entries/${slug}/delete`)
                .then(res => {
                    this.getEntries(this.page);
                    toastr.success("Entry deleted successfully!", "Success!")
                })
                .catch(err => {
                    toastr.error(err, "Error!")
                })
        }
    },
    template: `    
    <div>
        <div class="jumbotron jumbotron-fluid">
        <h1 class="text-center">Entries</h1>
        </div>
        <div class="container">
            <table class="table container">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Image</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="entry in entries.data">
                    <th scope="row">{{entry.id}}</th>
                    <td>{{entry.title}}</td>
                    <td><img :src="'/static/' + entry.img" height="35"></td>
                    <td>
                        <a :href="'/admin/entries/' + entry.slug">
                            <button class="btn btn-sm btn-primary">Edit</button>
                        </a>
                    </td>
                    <td><button class="btn btn-sm btn-danger" @click="deleteEntry(entry.slug)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <nav>
                <ul class="pagination justify-content-center">
                    <li class="page-item" v-if="entries.has_prev">
                        <a class="page-link" @click="getEntries(entries.prev_num)" href="#" onclick="return false;">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                    <li v-for="page in entries.pages" class="page-item" :class="{'active': page === entries.page}">
                        <a @click="getEntries(page)" href="#" onclick="return false;" class="page-link">{{page}}</a>
                    </li>
                    <li class="page-item" v-if="entries.has_next">
                        <a class="page-link" @click="getEntries(entries.next_num)" href="#" onclick="return false;">
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
new Vue({el: "#view-entries"});