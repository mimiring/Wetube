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

export const logout = (req, res) => {
	// To Do: Process Log Out
	res.redirect(routes.home);
};

export const users = (req, res) => res.render("Users", { pageTitle: "Users" });
export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });

