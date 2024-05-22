export default function (sequelize, Sequelize) {
  const ProxiesBots = sequelize.define("proxies_bots", {
    vps_source: {
      type: Sequelize.STRING
    },
    ip_address: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    vps_expire_date: {
      type: Sequelize.DATE
    },
    proxy_source: {
      type: Sequelize.STRING
    },
    proxy_credentials: {
      type: Sequelize.STRING
    },
    proxy_type: {
      type: Sequelize.STRING
    },
    proxy_expire_date: {
      type: Sequelize.DATE
    }
  });

  return ProxiesBots;
}