import { addNewArticle, deleteArticle, getArticle, getArticles, addNewCategory, deleteCategory, getCategories, updateArticle, updateCategory } from '../controllers/help.controller.js';
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
    "/help/articles",
    getArticles
  );

  app.get(
    "/help/articles/:id",
    getArticle
  );

  app.post(
    "/help/articles",
    [authJwt.verifyToken, authJwt.isAdmin],
    addNewArticle
  );
  app.patch(
    "/help/articles/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateArticle
  );
  app.delete(
    "/help/articles/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    deleteArticle
  );
  app.post(
    "/help/categories",
    [authJwt.verifyToken, authJwt.isAdmin],
    addNewCategory
  );
  app.patch(
    "/help/categories/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateCategory
  );
  app.delete(
    "/help/categories/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    deleteCategory
  );
  app.get(
    "/help/categories",
    getCategories
  );
};