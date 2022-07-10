Vue.component('blog-comments', {
	props: ["blogSlug"],
	data() {
		return {
			comments: [],
            pageSize: 5,
			firstName: '',
			lastName: '',
			body: '',
            loadText: 'Load More',
            submitText: 'Submit',
		};
	},
	created() {
		this.getComments(this.pageSize);

	},
	methods: {
		getComments(pageSize){
			this.loadText = "Loading...";
			ApiService.getComments({params: {per_page: pageSize, blog: this.blogSlug}})
				.then(res => {
					this.comments = res.data;
					this.pageSize = pageSize;
                    this.loadText = "Load More";
				})
				.catch(
					err => {
						toastr.error("There was an issue loading more comments, please try again later", "Error!")
						this.loadText = "Load More";
					}
				)
		},
		createComment(){
			this.submitText = "Posting...";
			ApiService.createComment({
				firstName: this.firstName,
				lastName: this.lastName,
				body: this.body,
				blog: this.blogSlug
			})
			.then(res => {
				this.getComments(this.pageSize);
				this.firstName = '';
				this.lastName = '';
				this.body = '';
				this.submitText = "Submit";
                toastr.success("Comment posted successfully!", "Success!")
			})
			.catch(
				err => {
					toastr.error("There was an issue posting this comment, please try again later", "Error!")
					this.submitText = "Submit";
				}
			)
		},
	},
	template: `
    <div>
        <div class="col-lg-12 mt-4" v-if="comments.total != 0">
            <div class="sidebar-item comments">
                <div class="sidebar-heading">
                    <h2 v-if="comments.total === 1">{{comments.total}} comment</h2>
                    <h2 v-else>{{comments.total}} comments</h2>
                </div>
                <div class="content">
                    <ul>
                        <li v-for="comment in comments.data">
                            <div class="right-content ml-0">
                                <h4>{{comment.firstName}}
                                    {{comment.lastName}}<span>{{comment.date}}</span></h4>
                                <div class="markdown" v-html="markdown(comment.body)"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="submit-comment">
                <button class="cursor-pointer" v-if="comments.has_next"
                    @click="getComments(pageSize + pageSize)">{{loadText}}</button>
            </div>
        </div>
        <div class="col-lg-12 mt-4">
            <div class="sidebar-item submit-comment mt-0">
                <div class="sidebar-heading">
                    <h2>Your comment</h2>
                </div>
                <div class="content">
                    <form id="create-comment" @submit.prevent="createComment">
                        <div class="row">
                            <div class="col-md-6 col-sm-12">
                                <fieldset>
                                    <input name="firstName" type="text" id="firstName" placeholder="Your first name"
                                        required="" v-model="firstName">
                                </fieldset>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <fieldset>
                                    <input name="lastName" type="text" id="lastName" placeholder="Your last name"
                                        required="" v-model="lastName">
                                </fieldset>
                            </div>
                            <div class="col-lg-12">
                                <fieldset>
                                    <textarea name="body" rows="6" id="body" placeholder="Your Comment" required=""
                                        v-model="body" class="mb-0"></textarea>
                                    <small>Comment your opinion on this blog! (hint: you can use
                                        markdown)</small>
                                </fieldset>
                            </div>
                            <div class="col-lg-12 mt-2">
                                <button type="submit" id="form-submit"
                                    class="main-button cursor-pointer mb-5">{{submitText}}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `
})
new Vue({ el: "#blog-comments" });