import React from "react";
import { withRouter, Link } from "react-router-dom";
import DateHelper from "../../helpers/DateHelper";

const PostCard = props => {
    const { id, created_at, title, body } = props.post;
    return (
        <div className="post">
            <div className="post__body">
                <div className="post__date">
                    {DateHelper.dataParaTexto(created_at)}
                </div>
                <div className="post__title">{title}</div>
                <div>
                    <div className="post__description">
                        <div dangerouslySetInnerHTML={{ __html: body }} />
                    </div>
                </div>
                <Link
                    className="post__cta"
                    to={{
                        pathname: `/post/${id}`,
                        state: {
                        post: props.post
                        }
                    }}
                >
                    Leia mais
                </Link>
            </div>
        </div>
    );
};
export default withRouter(PostCard);
