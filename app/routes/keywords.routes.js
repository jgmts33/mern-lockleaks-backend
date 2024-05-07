import { addNewKeyword, editCustomKeywords } from "../controllers/keywords.controller.js";
import authJwt from "../middleware/authjwt.js";

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/keywords",
    [authJwt.verifyToken, authJwt.isAdmin],
    addNewKeyword
  );

  app.patch(
    "/keywords",
    [authJwt.verifyToken, authJwt.isAdmin],
    editCustomKeywords
  );

};