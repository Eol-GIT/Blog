Vue.component('category-blogs', {
    props: ["entrySlug", "category"],
    data() {
        return {
            page: 1,
            blogs: []
        };
    },
    created(){
        this.paginatedBlogs(this.page);
    },
    methods: {
        paginatedBlogs(page){
            ApiService.getCategoryBlogs(this.category, {params: {page: page, entry: this.entrySlug}}).then(
                res => {
                    this.blogs = res.data;
                }
            )
        }
    },
    template: `
    <div>
    <div class="heading-page header-text">
      <h6 class="pl-2 text-capitalize"><a :href="'/' + entrySlug">{{ entrySlug }}</a> > <a :href="category">{{category}}</a></h6>
      <section class="page-heading">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-content">
                <h4>Blogs by Category</h4>
                <h2>{{category}}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    

    <div id="banner">
      <banner></banner>
    </div>


    <section class="blog-posts grid-system">
      <div class="container">
        <div class="row">
        <div class="col-lg-9" id="blog-entries">
            <div class="all-blog-posts">
                <div class="row">
                    <div class="col-lg-6" v-for="blog in blogs.data">
                      <a :href="'/' + entrySlug + '/' + blog.slug">
                      <div class="blog-post">
                          <div class="down-content">
                          <a :href="'/' + entrySlug + '/category/' + blog.category"><span>{{blog.category}}</span></a>
                          <h3 class="text-dark font-weight-bold">{{blog.title}}</h3>
                          <ul class="post-info">
                              <li>{{blog.date}}</li>
                          </ul>
                          <hr class="devider">
                          </div>
                      </div>
                      </a>
                    </div>
                    <div class="col-lg-12">
                      <ul class="page-numbers">
                        <li>
                            <a @click="paginatedBlogs(blogs.prev_num)" href="#" onclick="return false;" :class="{'disabled': !blogs.has_prev}">
                                <i class="fa fa-angle-double-left"></i>
                            </a>
                        </li>
                        <li v-for="page in blogs.pages" :class="{'active': page === blogs.page}">
                            <a @click="paginatedBlogs(page)" href="#" onclick="return false;">{{page}}</a>
                        </li>
                        <li>
                            <a @click="paginatedBlogs(blogs.next_num)" href="#" onclick="return false;" :class="{'disabled': !blogs.has_next}">
                                <i class="fa fa-angle-double-right"></i>
                            </a>
                        </li>
                      </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3" id="sidemenu">
          <sidemenu
            :entry-slug="entrySlug">
          </sidemenu>
        </div>
        </div>
      </div>
    </section>
    </div>
    `
})
new Vue({el: "#category-blogs"});