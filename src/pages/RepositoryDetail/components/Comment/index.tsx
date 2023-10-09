import { RepositoryComment } from '../../../../models/api/repository-comment';
import { getAvatarImageNameInitials } from '../../../../util/helpers/image.helper';
import './index.scss';

export default function Comment(comment: RepositoryComment) {
    return (
        <div className="comment-box">
            <div className="image-user" style={{backgroundImage: `url(${getAvatarImageNameInitials("Generic User")})`}}>
            </div>
            <div className="comment-body">
                <div className="comment-user">
                    <div className="comment-user-name">@GenericUser</div>
                    <div className="comment-date">{comment.created_at}</div>
                </div>
                <div className="comment-body-text">
                    {comment.comment}
                </div>
            </div>
        </div>
    )
}