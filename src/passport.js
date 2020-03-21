import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import { githubLoginCallback, facebookLoginCallback }  from "./controller/userController";
import routes from "./routes";

passport.use(User.createStrategy());

const GithubStrategyOptions = isDev => ({
  clientID: isDev ? process.env.GH_ID_DEV : process.env.GH_ID,
  clientSecret: isDev ? process.env.GH_SECRET_DEV : process.env.GH_SECRET,
  callbackURL: isDev ? `http://localhost:4000${routes.githubCallback}` : `https://mimiringtube.herokuapp.com${routes.githubCallback}`
});
passport.use(new GithubStrategy(GithubStrategyOptions(!process.env.PRODUCTION), githubLoginCallback));

const FacebookStrategyOptions = isDev => {
  return {
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: isDev ? `http://localhost:4000${routes.facebookCallback}` : `https://mimiringtube.herokuapp.com${routes.facebookCallback}`,
    profileFields: ["id", "displayName", "photos", "email"],
    scope: ["public_profile", "email"]
  };
}

passport.use(new FacebookStrategy(FacebookStrategyOptions(!process.env.PRODUCTION), facebookLoginCallback));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
