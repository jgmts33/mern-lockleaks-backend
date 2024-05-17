import authJwt from "../middleware/authjwt.js";
import { downloadDmcaImages, getDmcaImages, updateDmcaImageOrder, uploadDmcaImages, getDmcaImage, deleteDmcaImage } from "../controllers/dmca.controller.js";
import upload from 'express-fileupload';

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use(upload());

  app.get(
    "/dmca-images",
    getDmcaImages
  );

  app.post(
    "/dmca-images/upload",
    [authJwt.verifyToken, authJwt.isAdmin],
    uploadDmcaImages
  );

  app.put(
    "/dmca-images/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateDmcaImageOrder
  );

  app.get(
    "/dmca-images/download",
    downloadDmcaImages
  );

  app.get(
    "/images",
    getDmcaImage
  );

  app.delete(
    '/dmca-images/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    deleteDmcaImage
  )
};