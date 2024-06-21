import authJwt from "../middleware/authjwt.js";
import { downloadRRPhotoResult, getRRPhotoResult, getRRPhotoResultByUser, getRRPhotoResultsList, scan } from "../controllers/rr-photo-summaries.controller.js";

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/:id/scan-rr-photo",
    [authJwt.verifyToken],
    scan
  )

  app.get(
    "/rr-photo-scan-result-list",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    getRRPhotoResultsList
  )

  app.get(
    "/:id/rr-photo-scan-result",
    [authJwt.verifyToken],
    getRRPhotoResultByUser
  )

  app.get(
    "/rr-photo-scan-result",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    getRRPhotoResult
  )

  app.get(
    "/rr-photo-download-file",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    downloadRRPhotoResult
  )

};