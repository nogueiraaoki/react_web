import React from "react";
import DateHelper from "../../helpers/DateHelper";
import { withRouter } from "react-router-dom";
import image from "../../assets/images/banner.jpg";
import icon from "../../assets/images/header-icon.svg";

class Post extends React.Component {
  render() {
    const post = this.props.post;
    const text = post.body;
    return (
      <div className="blog">
        <div className="blog__background blog__background--brown">
          <div
            className="blog__image"
            style={{ backgroundImage: "url(" + image + ")" }}
          >
            <h1>
              Blog
            </h1>
          </div>
        </div>
        <div className="blog__body">
          <div className="blog__icon-container">
            <img src={icon} alt="icon" className="blog__icon" />
          </div>
          <button className="post__cta" onClick={() => this.props.history.push("/")}>Voltar</button>
          <h1 className="personal-stylist__date">
            {DateHelper.dataParaTexto(post.created_at)}
          </h1>
          <h1 className="personal-stylist__title">{post.title}</h1>
          <div className="personal-stylist">
            <div className="personal-stylist__body">
              <div className="personal-stylist__description personal-stylist__description__row">
                <div className="personal-stylist__description--text">
                  <div dangerouslySetInnerHTML={{ __html: text }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Post);
