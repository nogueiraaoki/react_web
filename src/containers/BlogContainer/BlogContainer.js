import React from "react";
import { toast } from "react-toastify";
import { requestBlogPosts } from "../../requests/requestBlogPosts";
import PostList from "../../components/PostList/PostList";
import image from "../../assets/images/banner.jpg";
import icon from "../../assets/images/header-icon.svg";

class BlogContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        posts: []
        };
    }

    async componentDidMount() {
        try {
            const response = await requestBlogPosts();
            this.setState({ posts: response.data.data });
        } catch (error) {
            console.log("erro", error);
            toast.warn("Não foi possível buscar os posts!");
        }
    }

    render() {
        return (
            <div className="blog">
                <div className="blog__background blog__background--brown">
                    <div className="blog__image" style={{ backgroundImage: "url(" + image + ")" }}>
                        <h1>Blog</h1>
                    </div>
                </div>
                <div className="blog__body blog__body--top-200">
                    <div className="blog__icon-container">
                        <img src={icon} alt="icon" className="blog__icon" />
                    </div>

                    <div className="blog__description">
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </div>
                    </div>

                    <PostList
                        posts={this.state.posts}
                        pageChange={this.props.pageChange}
                    />
                </div>
            </div>
        );
    }
}

export default BlogContainer;
