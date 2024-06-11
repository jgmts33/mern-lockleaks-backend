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
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    getBasicKeywords
  );

  app.get(
    "/keywords/custom",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    getCustomKeywords
  );

  app.post(
    "/keywords",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    addNewKeyword
  );

  app.patch(
    "/keywords/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    editCustomKeywords
  );

  app.delete(
    "/keywords/basic/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    deleteBasicKeyword
  );

  app.delete(
    "/keywords/custom/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    deleteCustomKeyword
  );

};