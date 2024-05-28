import authJwt from "../middleware/authjwt.js";
import { createPaymentLink, getPaymentLinkInfo, updatePaymentLink } from '../controllers/payment-links.controller.js'
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

  app.post(
    "/payment",
    [authJwt.verifyToken, authJwt.isAdmin],
    createPaymentLink
  );

  app.get(
    "/payment",
    getPaymentLinkInfo
  )

  app.patch(
    "/payment",
    updatePaymentLink
  )
};