import Footer from "../../../components/common/footer";
import Header from "../../../components/common/header";
import blogDetailsImg from "../../../assets/img/blog/details/blog-details.jpg";
import blogAuthorImg from "../../../assets/img/blog/details/blog-author.jpg";
import { TitleHelmet } from "../../../components/common/title-helmet";

const BlogDetailsPage = () => {
  return (
    <>
      <TitleHelmet title="Blog Details" />
      <Header />
      <section className="blog-hero spad">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-9 text-center">
              <div className="blog__hero__text">
                <h2>
                  Are you one of the thousands of Iphone owners who has no idea
                </h2>
                <ul>
                  <li>By Deercreative</li>
                  <li>February 21, 2019</li>
                  <li>8 Comments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Details Hero End */}
      {/* Blog Details Section Begin */}
      <section className="blog-details spad">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-12">
              <div className="blog__details__pic">
                <img src={blogDetailsImg} alt="Blog details" />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="blog__details__content">
                <div className="blog__details__share">
                  <span>Share</span>
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="twitter">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="youtube">
                        <i className="fa fa-youtube-play" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="linkedin">
                        <i className="fa fa-linkedin" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="blog__details__text">
                  <p>
                    Hydroderm is the highly desired anti-aging cream on the
                    block...
                  </p>
                  <p>
                    The most essential ingredient that makes hydroderm so
                    effective...
                  </p>
                </div>
                <div className="blog__details__quote">
                  <i className="fa fa-quote-left" />
                  <p>
                    “When designing an advertisement for a particular
                    product...”
                  </p>
                  <h6>_ John Smith _</h6>
                </div>
                <div className="blog__details__text">
                  <p>
                    Vyo-Serum along with tightening the skin also reduces the
                    fine lines...
                  </p>
                  <p>
                    Hydroderm is a multi-functional product that helps in
                    reducing...
                  </p>
                </div>
                <div className="blog__details__option">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="blog__details__author">
                        <div className="blog__details__author__pic">
                          <img src={blogAuthorImg} alt="Blog author" />
                        </div>
                        <div className="blog__details__author__text">
                          <h5>Aiden Blair</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="blog__details__tags">
                        <a href="#">#Fashion</a>
                        <a href="#">#Trending</a>
                        <a href="#">#2020</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="blog__details__btns">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <a href="" className="blog__details__btns__item">
                        <p>
                          <span className="arrow_left" /> Previous Pod
                        </p>
                        <h5>
                          It S Classified How To Utilize Free Classified Ad
                          Sites
                        </h5>
                      </a>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <a
                        href=""
                        className="blog__details__btns__item blog__details__btns__item--next"
                      >
                        <p>
                          Next Pod <span className="arrow_right" />
                        </p>
                        <h5>
                          Tips For Choosing The Perfect Gloss For Your Lips
                        </h5>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="blog__details__comment">
                  <h4>Leave A Comment</h4>
                  <form action="#">
                    <div className="row">
                      <div className="col-lg-4 col-md-4">
                        <input type="text" placeholder="Name" />
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <input type="text" placeholder="Email" />
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <input type="text" placeholder="Phone" />
                      </div>
                      <div className="col-lg-12 text-center">
                        <textarea placeholder="Comment" defaultValue={""} />
                        <button type="submit" className="site-btn">
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default BlogDetailsPage;
