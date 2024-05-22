export default function (sequelize, Sequelize) {
  const ProxiesBots = sequelize.define("proxys_bots", {
    name: {
      type: Sequelize.STRING
    },
    proxies_count: {
      type: Sequelize.INTEGER
    },
    expire_date: {
      type: Sequelize.DATE
    },
    credentials: {
      type: Sequelize.JSONB
    }
  });

  return ProxiesBots;
}