import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    //id 정렬을 -1로 하면 최근에 올린 영상이 위로 올라옴
    res.render("home.ejs", {
      pageTitle: "Home",
      videos,
    });
  } catch (error) {
    console.log(error);
    res.render("home.ejs", {
      pageTitle: "Home",
      videos: [],
    });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  //const searchingBy = req.query.term;
  let videos = []; //비디오가 입력되면 배열값이 바뀌므로(reassign 하므로) const가 아닌 let으로 선언함
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
    // 대소문자 구별하지 않고 찾기 위해 option에 i(insensitive. 덜 민감한)값을 줌
  } catch (error) {
    console.log(error);
  }
  res.render("search.ejs", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload.ejs", {
    pageTitle: "Upload",
  });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: {
      location, //multer가 S3같은 외부의 서버에 file 저장시 file의 location을 받음
    },
  } = req;
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  // To Do: Upload and save video
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    let video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    video.comments.reverse();

    res.render("videoDetail.ejs", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home); //유효하지 않은 id값의 URL로 이동 시 home으로 redirect
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (!video.creator.equals(req.user.id)) {
      throw Error();
    } else {
      res.render("editVideo.ejs", {
        pageTitle: `Edit ${video.title}`,
        video,
        editVideoUrl: routes.editVideo(video.id),
        deleteVideoUrl: routes.deleteVideo(video.id),
      });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  console.log("삭제요청이왔어용");
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (!video.creator.equals(req.user.id)) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home); // 삭제 되어도 에러가 나도 홈으로 이동하므로 밖으로 빼줌
};

// Register Video View
export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200); //okay를 의미함. browser 내 network - status에서 확인 가능
  } catch (error) {
    res.statusCode(400);
  } finally {
    res.end();
  }
};

// Add Comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  // 요청을 받고 데이터베이스에 코멘트를 추가함.
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    console.log(newComment);
    video.comments.push(newComment.id);
    video.save();
    // 문제가 안생기면 별도로 200같은거 안보내고 그냥 응답을 보냄.
    // 알아서 200이 추가됨.
    res.json({ comment: newComment });
  } catch (error) {
    // 문제가 생겨서 에러를 ㅂ냄.
    // 이건사실 500이 되는게 맞는거 같은데 암튼.
    res.status(400);
  }
};
