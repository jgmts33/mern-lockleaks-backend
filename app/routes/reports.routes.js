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
    "/report",
    [authJwt.verifyToken, authJwt.isAdmin],
    getReports
  );

  app.post(
    "/report",
    [authJwt.verifyToken, authJwt.isAdmin],
    addNewReport
  );

  app.patch(
    "/report/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateReport
  );

  app.delete(
    "/report/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    deleteReport
  );

};