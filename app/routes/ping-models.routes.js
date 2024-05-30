import { getPingModels, addNewPingModel, deletePingModel, updatePingModel }from '../controllers/ping-models.controller.js'
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
    "/ping-models",
    [authJwt.verifyToken, authJwt.isAdmin],
    getPingModels
  );

  app.post(
    "/ping-models",
    [authJwt.verifyToken, authJwt.isAdmin],
    addNewPingModel
  );

  app.patch(
    "/ping-models/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updatePingModel
  );

  app.delete(
    "/ping-models/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    deletePingModel
  );

};