import authJwt from "../middleware/authjwt.js";
import { downloadSocialResult, getCurrentSocialScannerStatus, getSocialResult, getSocialResultByUser, getSocialResultsList, scan } from "../controllers/social-summaries.controller.js";

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/:id/scan-social",
    [authJwt.verifyToken],
    scan
  )

  app.get(
    "/social-scan-result-list",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    getSocialResultsList
  )

  app.get(
    "/:id/social-result",
    [authJwt.verifyToken],
    getSocialResultByUser
  )

  app.get(
    "/social-result",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    getSocialResult
  )

  app.get(
    "/social-download-file",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    downloadSocialResult
  )

  app.get(
    "/:id/current-social-scanner-status",
    [authJwt.verifyToken],
    getCurrentSocialScannerStatus
  )

};