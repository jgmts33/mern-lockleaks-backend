import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../middleware/verifySignUp.js";;
import { signin, signup, refreshToken } from '../controllers/auth.controller.js';

export default function (app) {

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      checkDuplicateUsernameOrEmail,
      checkRolesExisted
    ],
    signup
  );

  app.post("/api/auth/signin", signin);
  app.post("/api/auth/refreshtoken", refreshToken);
};