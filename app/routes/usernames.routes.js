import authJwt from "../middleware/authjwt.js";
import { createUserNames, getUsernames } from "../controllers/usernames.controller.js";

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/usernames/:id",
    [authJwt.verifyToken],
    getUsernames
  );

  app.post(
    "/usernames/:id",
    [authJwt.verifyToken],
    createUserNames
  );
};