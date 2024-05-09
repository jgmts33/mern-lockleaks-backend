import authJwt from "../middleware/authjwt.js";
import { allAccess, adminBoard, moderatorBoard, getUserInfo } from '../controllers/user.controller.js';

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/users", allAccess);

  app.get(
    "/users/:id",
    [authJwt.verifyToken],
    getUserInfo
  );

  app.get(
    "/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    moderatorBoard
  );

  app.get(
    "/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminBoard
  );

};