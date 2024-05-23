import authJwt from "../middleware/authjwt.js";
import { storeSocialMediaProfiles } from "../controllers/social-media-profiles.controller.js";

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get(
  //   "/social-media-profiles",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  // );

  app.post(
    "/social-media-profiles/:id",
    [authJwt.verifyToken],
    storeSocialMediaProfiles
  );
};