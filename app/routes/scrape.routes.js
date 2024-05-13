import authJwt from "../middleware/authjwt.js";
import { scrapeData } from "../controllers/scrape.controller.js";

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/scrape",
    [authJwt.verifyToken],
    scrapeData
  );
};