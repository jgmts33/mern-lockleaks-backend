export default function (sequelize, Sequelize) {
  const Blog = sequelize.define("blog", {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    banner: {
      type: Sequelize.BLOB
    },
    moderatorInfo: {
      type: Sequelize.JSONB,
      defaultValue: {
        name: "",
        description: "",
        avatar: ""
      }
    },
    shortContent: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  });

  return Blog;
}