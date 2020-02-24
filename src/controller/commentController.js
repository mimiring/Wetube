import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import { videoDetail } from "./videoController";

// delete Comment
export const deleteComment = async (req, res) => {
	const {
		body: { commentId }, // 지울 코멘트의 id값
		user, // 지우는 사람
	} = req; // 2.
	try {
		const comment = await Comment.findById(commentId);
		console.log(comment);
		// comment 만든사람이랑 지우는 사람이 같은지 확인.
		if(!comment.creator.equals(user.id)) {
			throw Error(); // 다르면 에러
		} else {
			// 같으면 지운다.
			await Comment.findOneAndRemove({ _id: commentId });
		}
	} catch(error) {
		res.status(400);
	} finally {
		res.end(); // 3
	}
};