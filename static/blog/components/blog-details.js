Vue.component('blog-details', {
	props: ["blogSlug", "entrySlug"],
	data() {
		return {
			blog: {},
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
		axios.get(`/rest/s1/blogs/${this.blogSlug}`).then(res => { this.blog = res.data })
		this.getComments(this.pageSize);

	},
	mounted() {
		// Table of contents add and remove is-active
		var navs = document.querySelectorAll('.navigator-child');

		[].forEach.call(navs, function (nav) {
			nav.addEventListener('click', () => {
				// remove is-active from all elements
				navs.forEach(function (nav) {
					nav.classList.remove('is-active');
				});

				// apply is-active only at selected item
				nav.classList.toggle('is-active');
			})
		})
	},
	methods: {
		getComments(pageSize){
			this.loadText = "Loading...";
			axios.get('/rest/s1/comments', {params: {per_page: pageSize, blog: this.blogSlug}})
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
			axios.post('/rest/s1/comments/create', {
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
    <div class="heading-page header-text">
    <h6 class="pl-2 text-capitalize"><a :href="'/blog/entries/' + entrySlug">{{ entrySlug }}</a> > <a :href="blog.slug">{{blog.title}}</a></h6>
    <section class="page-heading">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-content">
              <h2>{{blog.title}}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>

    <section class="blog-posts grid-system">
    <div class="container">
      <div class="row">
        <div class="col-lg-10">
          <div class="all-blog-posts">
            <div class="row">
              <div class="col-lg-12">
                <div class="blog-post">
                  <div class="down-content">
                        <div class="d-flex">
                            <div class="p-1">
                                <a :href="'/blog/' + blog.author.slug"><img class="rounded-circle" :src="'/static/' + blog.author.img" height="50" width="50"/></a>
                            </div>
                            <div class="p-1">
                                <a :href="'/blog/' + blog.author.slug" class="h5">{{blog.author.firstName}} {{blog.author.lastName}}</a><br>
                                <small>Posted on:</small> {{new Date(blog.date).toLocaleDateString()}}<br>
                            </div>
                        </div>
                        <div class="p-2">
                        <a :href="'/blog/entries/' + entrySlug + '/category/' + blog.category"><span>{{blog.category}}</span></a>
                        <h2 class="font-weight-bold">{{blog.title}}</h2>
                        </div>
                    <hr class="devider">
                   <div class="markdown" v-html="markdown(blog.body)"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-2" id="sidemenu">
          <sidemenu :entry-slug="entrySlug"></sidemenu>
        </div>
      	</div>
      	<div class="col-lg-12" v-if="comments.total != 0">
			<div class="sidebar-item comments">
				<div class="sidebar-heading">
					<h2>{{comments.total}} comments</h2>
				</div>
				<div class="content">
					<ul>
					<li v-for="comment in comments.data">
						<div class="right-content ml-0">
						<h4>{{comment.firstName}} {{comment.lastName}}<span>{{new Date(blog.date).toLocaleDateString()}}</span></h4>
						<div class="markdown" v-html="markdown(comment.body)"></div>
						</div>
					</li>
					</ul>
				</div>
			</div>
			<button class="btn btn-sm btn-outline-primary w-100" v-if="comments.has_next" @click="getComments(pageSize + pageSize)">{{loadText}}</button>
      	</div>
		<div class="col-lg-12">
          <div class="sidebar-item submit-comment">
            <div class="sidebar-heading">
              <h2>Your comment</h2>
            </div>
            <div class="content">
              <form id="create-comment" @submit.prevent="createComment">
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
                      <div class="col-lg-12">
                      <fieldset>
                          <textarea name="body" rows="6" id="body" placeholder="Your Comment" required="" v-model="body" class="mb-0"></textarea>
                          <small>Comment your opinion on this blog! (hint: you can use markdown)</small>
                      </fieldset>
                      </div>
                      <div class="col-lg-12 mt-2">
                          <button type="submit" id="form-submit" class="main-button cursor-pointer">{{submitText}}</button>
                      </div>
                  </div>
              </form>
            </div>
          </div>
        </div>
    </div>
    </section>
    </div>
    `
})
new Vue({ el: "#blog-details" });