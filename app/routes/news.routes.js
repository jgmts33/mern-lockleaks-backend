import authJwt from "../middleware/authjwt.js";
import { createNewSubsribeUser, createNews, deleteNews, getNews, getNewsList, sendNews, updateNews } from '../controllers/news.controller.js';
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
    "/news",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    getNewsList
  );

  app.get(
    "/news/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    getNews
  );

  app.post(
    "/news",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    createNews
  )

  app.post(
    "/send-news/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    sendNews
  )

  app.patch(
    "/news/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    updateNews
  )

  app.delete(
    "/news/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    deleteNews
  )

  app.post(
    "/subscribe",
    createNewSubsribeUser
  )
};