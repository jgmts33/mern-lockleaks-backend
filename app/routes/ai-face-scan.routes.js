import authJwt from "../middleware/authjwt.js";
import { downloadAIFaceResult, getAIFaceResult, getAIFaceResultByUser, getAIFaceResultsList, scan } from "../controllers/ai-bots-summaries.controller.js";

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/:id/scan-ai-face",
    [authJwt.verifyToken],
    scan
  )

  app.get(
    "/ai-face-scan-result-list",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    getAIFaceResultsList
  )

  app.get(
    "/:id/ai-face-scan-result",
    [authJwt.verifyToken],
    getAIFaceResultByUser
  )

  app.get(
    "/ai-face-scan-result",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    getAIFaceResult
  )

  app.get(
    "/ai-face-download-file",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    downloadAIFaceResult
  )

};