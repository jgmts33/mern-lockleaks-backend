import authJwt from "../middleware/authjwt.js";
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../controllers/blog.controller.js";

export default function (app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/blogs",
    getBlogs
  );

  app.get(
    "/blogs/:id",
    getBlog
  )

  app.post(
    "/blogs/new",
    [authJwt.verifyToken, authJwt.isAdmin],
    createBlog
  )

  app.patch(
    "/blogs/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateBlog
  )

  app.delete(
    "/blogs/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    deleteBlog
  )
};