import authJwt from "../middleware/authjwt.js";
import { checkDoubleUsername, createUserNames, deleteUsername, getUsernames, updateUserName } from "../controllers/usernames.controller.js";

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

  app.post(
    "/username-validation",
    [authJwt.verifyToken],
    checkDoubleUsername
  )

  app.patch(
    "/usernames/:id",
    [authJwt.verifyToken],
    updateUserName
  );

  app.delete(
    "/usernames/:id",
    [authJwt.verifyToken],
    deleteUsername
  );
};