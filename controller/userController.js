import passport from "passport";
import routes from "../routes";
import User from "../models/User";


export const getJoin = (req, res) => {
	// 회원가임
	// db[req.body.id] = req.body.password;
	// if(db.includes(req.body.id)){
	// 	res.render("join", { pageTitle: "Join", answer: "회원가입성공못했음~! 이미가입했으음~ 창의력부족~" });
	// }
	// if(req.body.password.length < 13){
	// 	res.render("join", { pageTitle: "Join", answer: "회원가입성공못했음~! 짧음!비버언" });
	// }
	res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
	const {
		body: { name, email, password, password2 }
	} = req;
	if(password != password2) {
		res.status(400);
		res.render("join", { pageTitle: "Join" });
	} else {
		try {
			const user = await User({ //User.create할 경우 생성 후 DB에 저장까지 됨
				name,
				email
			});
			console.log("가입:",user,password);
			await User.register(user, password);
			next();
		} catch(error) {
			console.log(error);
			res.redirect(routes.home);
		}
	} 
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "Login" });
export const postLogin = passport.authenticate("local", {
	failureRedirect: routes.login, // 로그인 실패한 경우
	successRedirect: routes.home // 로그인 성공한 경우성공해서 홈으로 가는거 같은데 세션유지가 안되는듯! 
}); //'local' : 설치한 strategy 이름(passport-local)

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async(_, __, profile, cb) => { // 함수의 parameter 중 사용하지 않는 것들은 _, __ 처리. 자리는 채워야 하므로
	const {
		_json: {id, avatar_url: avatarUrl, name, email}
	} = profile;
	try {
		const user = await User.findOne({ email });
		if(user) {
			user.githubId = id,
			user.save();
			return cb(null, user);
		} else {
			const newUser = await User.create({
			email,
			name,
			githubId: id,
			avatarUrl: avatar_url
			});
			return cb(null, newUser);
		}
	}
	catch(errror) {
		return cb(error);
	}
};
// github 인증 정보를 불러오려면 github의 프로필이 공개되어있어야 함(ex: email이 private이 아닌 public으로)

export const postGithubLogin = (req, res) => {
	res.redirect(routes.home);
}

export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = (accessToken, refreshToken, profile, cb) => {
	console.log(accessToken, refreshToken, profile, cb)
};

export const postFacebookLogin = (req, res) => {
	res.redirect(routes.home);
}


export const logout = (req, res) => {
	req.logout();
	res.redirect(routes.home);
};

export const getMe = (req, res) => {
	res.render("userDetail", { pageTitle: "User Detail", user: req.user });
	//현재 로그인한 user로 연결
};

export const users = (req, res) => res.render("Users", { pageTitle: "Users" });
export const userDetail = async(req, res) => {
	const {
		params: { id }
	} = req;
	try {
		const user = await User.findById(id);
		res.render("userDetail", { pageTitle: "User Detail", user });
	} catch(error) {
		res.redirect(routes.home);
	}
};

export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });
