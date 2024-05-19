export default function (sequelize, Sequelize) {
  const Blog = sequelize.define("blogs", {
    title: {
      type: Sequelize.STRING
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
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT
    }
  });

  return Blog;
}