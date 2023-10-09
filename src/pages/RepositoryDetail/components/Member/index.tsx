import { RepositoryColaborator } from '../../../../models/api/repository-colaborator';
import { getAvatarImageNameInitials } from '../../../../util/helpers/image.helper';


export default function Member(member: RepositoryColaborator) {
    return (
        <div className="comment-box">
            <div className="image-user" style={{backgroundImage: `url(${getAvatarImageNameInitials("Generic User")})`}}>
            </div>
            <div className="comment-body">
                <div className="comment-user">
                    <div className="comment-user-name">generic User</div>
                </div>
            </div>
        </div>
    )
}