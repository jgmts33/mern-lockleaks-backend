import { getProxiesBots, addNewProxiesBot, deleteProxiesBot, updateNewProxiesBot }from '../controllers/proxies-bots.controller.js'
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
    "/proxies-bots",
    [authJwt.verifyToken, authJwt.isAdmin],
    getProxiesBots
  );

  app.post(
    "/proxies-bots",
    [authJwt.verifyToken, authJwt.isAdmin],
    addNewProxiesBot
  );

  app.patch(
    "/proxies-bots/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateNewProxiesBot
  );

  app.delete(
    "/proxies-bots/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    deleteProxiesBot
  );

};