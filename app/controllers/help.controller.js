import db from "../models/index.js";

const { helpCategories: HelpCategories, helpArticles: HelpArticles } = db;

export const addNewCategory = async (req, res) => {
  const { name, description } = req.body;

  try {

    const newCategory = await HelpCategories.create({
      name,
      description,
    });

    res.status(200).send({
      id: newCategory.id,
      name: newCategory.name,
      description: newCategory.description,
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const category = await HelpCategories.findByPk(id);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    await category.update({
      name,
      description,
    });
    res.status(200).send({
      id: category.id,
      name: category.name,
      description: category.description,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await HelpCategories.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send({
      message: "Category deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const getCategories = async (req, res) => {
  try {
    const categories = await HelpCategories.findAll();
    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const addNewArticle = async (req, res) => {
  const { title, content, categoryId } = req.body;

  try {

    const newArticle = await HelpArticles.create({
      title,
      content,
      categoryId
    });

    res.status(200).send({
      id: newArticle.id,
      title: newArticle.title,
      content: newArticle.content,
      categoryId: newArticle.categoryId,
    });

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content, categoryId } = req.body;
  try {
    const article = await HelpArticles.findByPk(id);
    if (!article) {
      return res.status(404).send('Article not found');
    }
    await article.update({
      title,
      content,
      categoryId
    });
    res.status(200).send({
      id: article.id,
      title: article.title,
      content: article.content,
      categoryId: article.categoryId,
    });
  }
  catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    await HelpArticles.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send({
      message: "Article deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const getArticles = async (req, res) => {
  const { categoryId } = req.query;
  try {

    if (categoryId) {
      const articles = await HelpArticles.findAll({
        where: {
          categoryId
        },
        attributes: ['id', 'title', 'categoryId']
      });

      res.status(200).send(articles);
    }

    else {
      const articles = await HelpArticles.findAll({
        attributes: ['id', 'title', 'categoryId']
      });

      res.status(200).send(articles);
    }
  }
  catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

export const getArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await HelpArticles.findByPk(id, {
      attributes: ['id', 'title', 'content', 'categoryId']
    });

    if (!article) {
      return res.status(404).send('Article not found');
    }
    res.status(200).send(article);
  }
  catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}