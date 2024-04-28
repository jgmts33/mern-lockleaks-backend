import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../middleware/verifySignUp.js";;
import { signin, signup, refreshToken, verifyEmail, googleAuthenticateUser, facebookAuthenticateUser, twitterAuthenticateUser, forgotPassword, resetPassword } from '../controllers/auth.controller.js';

export default function (app) {

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auth/signup", [checkDuplicateUsernameOrEmail, checkRolesExisted], signup);
  app.post("/auth/google", googleAuthenticateUser);
  app.post("/auth/facebook", facebookAuthenticateUser);
  app.post("/auth/twitter", twitterAuthenticateUser);

  app.post("/auth/signin", signin);
  app.post("/auth/forgot-password", forgotPassword);
  app.post("/auth/reset-password", resetPassword);
  app.post("/auth/refreshtoken", refreshToken);
  app.post("/auth/verify-email", verifyEmail);
};