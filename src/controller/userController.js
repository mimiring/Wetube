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
		req.flash('error', 'Password dosent match!');
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
	successRedirect: routes.home, // 로그인 성공한 경우성공해서 홈으로 가는거 같은데 세션유지가 안되는듯! 
	successFlash: "Welcome!",
	failureFlash: "Can't login. Check your Email or Password."
}); //'local' : 설치한 strategy 이름(passport-local)

export const githubLogin = passport.authenticate("github", {
	successFlash: "Welcome!",
	failureFlash: "Can't login. Check your Email or Password."
});

export const githubLoginCallback = async(_, __, profile, cb) => { // 함수의 parameter 중 사용하지 않는 것들은 _, __ 처리. 자리는 채워야 하므로
	const {
		_json: {id: githubId, avatar_url: avatarUrl, name, email}
	} = profile;
	console.log(profile);
	try {
		const user = await User.findOne({ email });
		if(user) {
			user.githubId = githubId;
			user.save();
			return cb(null, user);
		} else {
			const newUser = await User.create({
				email,
				name,
				githubId,
				avatarUrl
			});
			return cb(null, newUser);
		}
	} catch(error) {
		return cb(error);
	}
};
// github 인증 정보를 불러오려면 github의 프로필이 공개되어있어야 함(ex: email이 private이 아닌 public으로)

export const postGithubLogin = (req, res) => {
	res.redirect(routes.home);
}

export const facebookLogin = passport.authenticate('facebook', {
	successFlash: "Welcome!",
	failureFlash: "Can't login. Check your Email or Password."
});

export const facebookLoginCallback = async(_, __, profile, cb) => {
	const { _json : {id, name, email} } = profile;
	try {
		const user = await User.findOne({ email });
		if(user) {
			user.facebookId = id;
			user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
			user.save();
			return cb(null, user);
		} else {
			const newUser = await User.create({
			email,
			name,
			facebookId: id,
			avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
			});
			return cb(null, newUser);
		}
	}
	catch(errror) {
		return cb(error);
	}
};

export const postFacebookLogin = (req, res) => {
	res.redirect(routes.home);
}


export const logout = (req, res) => {
	req.flash("info", "Looged out. See you soon:)");
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
		const user = await User.findById(id).populate("videos");
		res.render("userDetail", { pageTitle: "User Detail", user });
	} catch(error) {
		req.flash("error", "User not found.");
		res.redirect(routes.home);
	}
};

export const postEditProfile = async(req, res) => {
	const {
		body: { name, email },
		file
	} = req;
	try{
		await User.findByIdAndUpdate(req.user.id, {
			name,
			email,
			avatarUrl: file ? file.location : req.user.avatarUrl
		});
		req.flash("success", "Profile updated!")
		res.redirect(routes.me);
	} catch(error) {
		req.flash("error", "Can't update.")
		res.redirect(routes.editProfile);
	}
};
export const getEditProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });

export const getChangePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });
export const postChangePassword = async(req, res) => {
	const {
		body: { oldPassword, newPassword, newPassword1 }
	} = req;
	try {
		if(newPassword !== newPassword1) {
			req.flash("error", "Passwords doesn't match!");
			res.status(400);
			res.redirect(`/users/${routes.changePassword}`);
			return;
		}
		await req.user.changePassword(oldPassword, newPassword);
		res.redirect(routes.me);
	} catch (error) {
		req.flash("error", "Can't change password.");
		res.status(400);
		res.redirect(`/users/${routes.changePassword}`);
	}
};