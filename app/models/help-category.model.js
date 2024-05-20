export default function (sequelize, Sequelize) {
  const HelpCategories = sequelize.define("help_categories", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return HelpCategories;
}