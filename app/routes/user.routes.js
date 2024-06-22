import authJwt from "../middleware/authjwt.js";
import { getUsersList, getUserInfo, getOrdersReport, updatePaymentStatus, handleDeleteSubmition, updateUserInfo, updateUserRole, updateUserVisible, deleteUser, kycSubmit, handleKYCSubmission, uploadCopyrightHolder, downloadCopyrightHolder, updateToModerator, getDataReportList, getDataAnalyticsList, downloadReportOrAnalyticsPDF, handleDownloadDataReport, getModeratorsOrAdmin, getUsersReport, getNotifications, clearNotifications, updateUserEmailVerified } from '../controllers/user.controller.js';
import { downloadTestResult, testBots } from "../controllers/test-bots.controller.js";
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
    "/users-report",
    [authJwt.verifyToken, authJwt.isAdmin],
    getUsersReport
  )

  app.get(
    "/orders-report",
    [authJwt.verifyToken, authJwt.isAdmin],
    getOrdersReport
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
    "/user-email-verify/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateUserEmailVerified
  )

  app.patch(
    "/user-visible/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateUserVisible
  )

  app.patch(
    "/user-to-moderator/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateToModerator
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

  app.post(
    "/user-copyright-holder/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    uploadCopyrightHolder
  );

  app.get(
    "/user-copyright-holder/:id",
    [authJwt.verifyToken],
    downloadCopyrightHolder
  );

  app.get(
    "/download-data-report",
    handleDownloadDataReport
  )

  app.get(
    "/data-report",
    [authJwt.verifyToken, authJwt.isAdmin],
    getDataReportList
  )

  app.get(
    "/data-analytics",
    [authJwt.verifyToken, authJwt.isAdmin],
    getDataAnalyticsList
  )

  app.get(
    "/download-pdf",
    [authJwt.verifyToken, authJwt.isAdmin],
    downloadReportOrAnalyticsPDF
  )

  app.get(
    "/:id/notification",
    [authJwt.verifyToken],
    getNotifications
  )

  app.delete(
    "/:id/notification",
    [authJwt.verifyToken],
    clearNotifications
  )

  app.get(
    "/:id/test-bots",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    testBots
  )

  app.get(
    "/download-test-bots-result",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    downloadTestResult
  )
};