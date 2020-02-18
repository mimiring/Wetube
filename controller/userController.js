export const join = (req, res) => {
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
export const login = (req, res) => res.render("login", { pageTitle: "Login" });
export const logout = (req, res) => res.send("logout", { pageTitle: "Logout" });
export const users = (req, res) => res.send("Users", { pageTitle: "Users" });
export const userDetail = (req, res) => res.send("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });

