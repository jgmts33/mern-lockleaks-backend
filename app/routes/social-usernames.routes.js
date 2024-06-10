import authJwt from "../middleware/authjwt.js";
import { createNewSocialUsername, deleteSocialUsername, getSocialUsername, updateSocialUsername } from "../controllers/social-usernames.controller.js";

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/social-usernames/:id",
    [authJwt.verifyToken],
    getSocialUsername
  );

  app.post(
    "/social-usernames/:id",
    [authJwt.verifyToken],
    createNewSocialUsername
  );

  app.patch(
    "/social-usernames/:id",
    [authJwt.verifyToken],
    updateSocialUsername
  );

  app.delete(
    "/social-usernames/:id",
    [authJwt.verifyToken],
    deleteSocialUsername
  );
};