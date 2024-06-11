import authJwt from "../middleware/authjwt.js";
import { scrapeData, downloadSrapedData, getScrapedDataList, getScrapedDataListByUser , acceptOrder} from "../controllers/scrape.controller.js";

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/:id/scraped-data",
    [authJwt.verifyToken],
    getScrapedDataListByUser
  )

  app.get(
    "/scraped-data",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    getScrapedDataList
  )

  app.post(
    "/:id/scrape",
    [authJwt.verifyToken],
    scrapeData
  );

  app.get(
    "/:id/download-file",
    [authJwt.verifyToken],
    downloadSrapedData
  )

  app.get(
    "/accept-order",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    acceptOrder
  )
};