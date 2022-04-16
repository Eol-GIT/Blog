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
		ApiService.getBlogDetails(this.blogSlug).then(res => { this.blog = res.data })
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
    <div class="heading-page header-text">
        <h6 class="pl-2">
            <a :href="'/' + entrySlug">{{ blog.entry.title }}</a> > <a :href="blog.slug">{{blog.title}}</a>
        </h6>
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

    <div id="banner">
        <banner></banner>
    </div>

    <section class="blog-posts grid-system mt-2">
        <div class="container">
            <div class="row">
                <div class="col-lg-10">
                    <div class="all-blog-posts">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="blog-post mb-0">
                                    <div class="down-content">
                                        <div class="d-flex">
                                            <div class="py-1 pr-1">
                                                <a :href="'/blog/' + blog.author.slug">
                                                    <img class="rounded-circle" :alt="blog.author.username + ' Avatar'"
                                                        :src="'/static/' + blog.author.img" height="50" width="50" />
                                                </a>
                                            </div>
                                            <div class="py-1 pl-1">
                                                <a :href="'/blog/' + blog.author.slug"
                                                    class="h5">{{blog.author.username}}</a><br>
                                                <small>Posted on: {{blog.date}} | Views: {{nFormatter(blog.views,
                                                    1)}}</small><br>
                                            </div>
                                        </div>
                                        <div class="py-2">
                                            <a
                                                :href="'/' + entrySlug + '/category/' + blog.category"><span>{{blog.category}}</span></a>
                                            <h1 class="font-weight-bold pb-0">{{blog.title}}</h1>
                                            <hr class="devider">
                                        </div>
                                        <div class="markdown" v-html="markdown(blog.body)"></div>
                                        <div class="d-flex flex-row-reverse mt-3">
                                            <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
                                                <a class="a2a_button_facebook"></a>
                                                <a class="a2a_button_twitter"></a>
                                                <a class="a2a_button_linkedin"></a>
                                                <a class="a2a_button_telegram"></a>
                                                <a class="a2a_button_whatsapp"></a>
                                                <a class="a2a_button_facebook_messenger"></a>
                                                <a class="a2a_button_reddit"></a>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-md text-break mt-3">
                                                <a :href="'/' + blog.entry.slug + '/' + blog.prev_blog.slug"
                                                    v-if="blog.prev_blog">
                                                    <button class="btn btn-light text-primary prev-next-blog-btn">
                                                        ❮ {{blog.prev_blog.title}}
                                                    </button>
                                                </a>
                                            </div>
                                            <div class="col-md text-break mt-3">
                                                <a :href="'/' + blog.entry.slug + '/' + blog.next_blog.slug"
                                                    v-if="blog.next_blog">
                                                    <button class="btn btn-light text-primary prev-next-blog-btn">
                                                        {{blog.next_blog.title}} ❯
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12 p-0">
                                <div id="banner">
                                    <banner></banner>
                                </div>
                            </div>
                            <div class="col-lg-12" v-if="comments.total != 0">
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
                            <div class="col-lg-12">
                                <div class="sidebar-item submit-comment mt-0">
                                    <div class="sidebar-heading">
                                        <h2>Your comment</h2>
                                    </div>
                                    <div class="content">
                                        <form id="create-comment" @submit.prevent="createComment">
                                            <div class="row">
                                                <div class="col-md-6 col-sm-12">
                                                    <fieldset>
                                                        <input name="firstName" type="text" id="firstName"
                                                            placeholder="Your first name" required=""
                                                            v-model="firstName">
                                                    </fieldset>
                                                </div>
                                                <div class="col-md-6 col-sm-12">
                                                    <fieldset>
                                                        <input name="lastName" type="text" id="lastName"
                                                            placeholder="Your last name" required="" v-model="lastName">
                                                    </fieldset>
                                                </div>
                                                <div class="col-lg-12">
                                                    <fieldset>
                                                        <textarea name="body" rows="6" id="body"
                                                            placeholder="Your Comment" required="" v-model="body"
                                                            class="mb-0"></textarea>
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
                    </div>
                </div>
                <div class="col-lg-2" id="sidemenu">
                    <sidemenu :entry-slug="entrySlug"></sidemenu>
                </div>
            </div>
        </div>
    </section>
</div>
    `
})
new Vue({ el: "#blog-details" });