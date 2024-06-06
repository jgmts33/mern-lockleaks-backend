import authJwt from "../middleware/authjwt.js";
import { getUsersList, getUserInfo, getExtraReport, updatePaymentStatus, handleDeleteSubmition, updateUserInfo, updateUserRole, updateUserVisible, deleteUser, kycSubmit, handleKYCSubmission } from '../controllers/user.controller.js';
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
    "/users/:id",
    [authJwt.verifyToken],
    getUserInfo
  );

  app.get(
    "/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    getUsersList
  );

  app.get(
    "/extra-report",
    [authJwt.verifyToken, authJwt.isAdmin],
    getExtraReport
  )

  app.patch(
    "/subscription/:id",
    [authJwt.verifyToken],
    updatePaymentStatus
  )

  app.post(
    "/report-delete-data",
    handleDeleteSubmition
  )

  app.patch(
    "/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateUserInfo
  )

  app.patch(
    "/user-role/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateUserRole
  )

  app.patch(
    "/user-visible/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateUserVisible
  )

  app.delete(
    "/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    deleteUser
  )

  app.post(
    "/user-kyc/:id",
    [authJwt.verifyToken],
    kycSubmit
  )

  app.patch(
    "/user-kyc/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    handleKYCSubmission
  )
};