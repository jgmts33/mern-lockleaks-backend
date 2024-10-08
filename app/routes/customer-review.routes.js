import authJwt from "../middleware/authjwt.js";
import { createCustomerView, deleteCustomerReview, getCustomerReViews, getCustomerReview, updateCustomerView } from '../controllers/customer-review.controller.js';
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
    "/customer-reviews",
    getCustomerReViews
  );

  app.get(
    "/customer-reviews/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    getCustomerReview
  )

  app.post(
    "/customer-reviews/new",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    createCustomerView
  )

  app.patch(
    "/customer-reviews/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    updateCustomerView
  )
  

  app.delete(
    "/customer-reviews/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    deleteCustomerReview
  )
};