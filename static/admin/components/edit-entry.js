Vue.component('edit-entry', {
    props: ["slug"],
    data() {
        return {
            entry: {}
        };
    },
    created(){
        this.getEntryDetails();
    },
    methods: {
        getEntryDetails(){
            axios.get(`/rest/s1/entries/${this.slug}`)
                .then(res => {
                    this.entry = res.data
                })
        },
        updateEntry(){
            axios.post(`/rest/s1/entries/${this.slug}/update`, {
                title: this.entry.title,
                img: this.entry.img,
                body: this.entry.body,
                keywords: this.entry.keywords
            })
            .then(res => {
                this.getEntryDetails();
                toastr.success("Entry details updated successfully!", "Success!")
            })
            .catch(err => {
                toastr.error(err, "Error!")
            })
        }
    },
    template: `    
    <div>
        <div class="jumbotron jumbotron-fluid text-center">
            <h5>Entry:</h5>
            <h1>{{entry.title}}</h1>
        </div>
        <div class="container mb-5">
        <form method="POST" @submit.prevent="updateEntry">
            <div class="form-group">
                <label>Entry Title</label>
                <input type="text" class="form-control" name="title" id="title" placeholder="Entry Title" v-model="entry.title" required>
            </div>
            <div class="form-group">
                <label>Entry Image</label>
                <input type="text" class="form-control" name="img" id="image" placeholder="Entry image" v-model="entry.img" required>
            </div>
            <div class="form-group">
                <label>Entry Description</label>
                <textarea class="form-control" name="body" id="body" rows="3" v-model="entry.body" required></textarea>
                <small class="form-text text-muted">To write the Entry description use markdown!</small>
            </div>
            <div class="form-group">
                <label>Entry Keywords</label>
                <input type="text" class="form-control" name="keywords" id="keywords" placeholder="Entry Keywords" v-model="entry.keywords" required>
                <small class="form-text text-muted">Keywords must be letters and numbers only and be separated by commas(,)</small>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
    `
})
new Vue({el: "#edit-entry"});