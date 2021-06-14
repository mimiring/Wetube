const routes = {
  home: "/",
  join: "/join",
  login: "/login",
  github: "/auth/github",
  githubCallback: "/auth/github/callback",
  facebook: "/auth/facebook",
  facebookCallback: "/auth/facebook/callback",
  logout: "/logout",
  users: "/users",
  me: "/me",
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return "/:id";
    }
  },
  editProfile: "/edit-profile",
  changePassword: "/change-password",
  search: "/search",
  upload: "/upload",
  videos: "/videos",
  videoDetail: (id) => {
    if (id) {
      return `/videos/${id}`;
    } else {
      return "/:id";
    }
  },
  editVideo: (id) => {
    if (id) {
      return `/videos/${id}/edit`;
    } else {
      return "/:id/edit";
    }
  },

  deleteVideo: (id) => {
    if (id) {
      return `/videos/${id}/delete`;
    } else {
      return "/:id/delete";
    }
  },
  comments: "/comments",
  addComment: "/:id/comment",
  deleteComment: (id) => {
    if (id) {
      return `/${id}/comment/delete`;
    } else {
      return "/:id/comment/delete";
    }
  },
  api: "/api",
  registerView: "/:id/view",
};

export default routes;
