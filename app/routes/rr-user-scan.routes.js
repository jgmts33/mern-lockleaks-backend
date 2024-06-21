import authJwt from "../middleware/authjwt.js";
import { downloadRRUserResult, getRRUserResult, getRRUserResultByUser, getRRUserResultsList, scan } from "../controllers/rr-user-summaries.controller.js";

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/:id/scan-rr-user",
    [authJwt.verifyToken],
    scan
  )

  app.get(
    "/rr-user-scan-result-list",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    getRRUserResultsList
  )

  app.get(
    "/:id/rr-user-scan-result",
    [authJwt.verifyToken],
    getRRUserResultByUser
  )

  app.get(
    "/rr-user-scan-result",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    getRRUserResult
  )

  app.get(
    "/rr-user-download-file",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    downloadRRUserResult
  )

};