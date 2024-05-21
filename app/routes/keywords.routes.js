import { addNewKeyword, deleteBasicKeyword, deleteCustomKeyword, editCustomKeywords, getBasicKeywords, getCustomKeywords } from "../controllers/keywords.controller.js";
import authJwt from "../middleware/authjwt.js";

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/keywords/basic",
    [authJwt.verifyToken],
    getBasicKeywords
  );

  app.get(
    "/keywords/custom",
    [authJwt.verifyToken],
    getCustomKeywords
  );

  app.post(
    "/keywords",
    [authJwt.verifyToken, authJwt.isAdmin],
    addNewKeyword
  );

  app.patch(
    "/keywords/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    editCustomKeywords
  );

  app.delete(
    "/keywords/basic/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    deleteBasicKeyword
  );

  app.delete(
    "/keywords/custom/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    deleteCustomKeyword
  );

};