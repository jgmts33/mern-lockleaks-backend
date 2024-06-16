export default function (sequelize, Sequelize) {
  const Reports = sequelize.define("reports", {
    website: {
      type: Sequelize.STRING,
      default: ''
    },
    method: {
      type: Sequelize.TEXT,
      defaultValue: ''
    },
    links: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      default: []
    },
    success: {
      type: Sequelize.BOOLEAN,
      default: false
    },
  });

  return Reports;
}