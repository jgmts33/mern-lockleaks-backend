import { addNewArticle, deleteArticle, getArticle, getArticles, addNewCategory, deleteCategory, getCategories, updateArticle, updateCategory, reactHelpArticle, searchArticles } from '../controllers/help.controller.js';
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
    "/help/search-articles",
    searchArticles
  )

  app.get(
    "/help/articles/:id",
    getArticle
  );

  app.post(
    "/help/articles",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    addNewArticle
  );
  app.patch(
    "/help/articles/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    updateArticle
  );
  app.post(
    "/help/articles/:id",
    [authJwt.verifyToken],
    reactHelpArticle
  );

  app.delete(
    "/help/articles/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    deleteArticle
  );
  app.post(
    "/help/categories",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    addNewCategory
  );
  app.patch(
    "/help/categories/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
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