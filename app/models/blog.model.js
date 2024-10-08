export default function (sequelize, Sequelize) {
  const Blog = sequelize.define("blogs", {
    title: {
      type: Sequelize.STRING
    },
    banner: {
      type: Sequelize.STRING
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
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    }
  });

  return Blog;
}