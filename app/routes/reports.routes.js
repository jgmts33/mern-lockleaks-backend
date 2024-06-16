import { addNewReport, deleteReport, getReports, updateReport }from '../controllers/reports.controller.js'
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
    "/reports",
    [authJwt.verifyToken, authJwt.isAdmin],
    getReports
  );

  app.post(
    "/reports",
    [authJwt.verifyToken, authJwt.isAdmin],
    addNewReport
  );

  app.patch(
    "/reports/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateReport
  );

  app.delete(
    "/reports/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    deleteReport
  );

};