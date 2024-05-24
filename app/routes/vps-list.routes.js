import authJwt from "../middleware/authjwt.js";
import { createVps, deleteVps, getVpsInfo, getVpsList, updateVpsInfo } from '../controllers/vps-list.controller.js'
// import multer from 'multer';

// const upload = multer();

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/vps-list",
    [authJwt.verifyToken, authJwt.isAdmin],
    getVpsList
  );

  app.get(
    "/vps-list/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    getVpsInfo
  )

  app.post(
    "/vps-list/new",
    [authJwt.verifyToken, authJwt.isAdmin],
    createVps
  )

  app.patch(
    "/vps-list/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateVpsInfo
  )


  app.delete(
    "/vps-list/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    deleteVps
  )
};