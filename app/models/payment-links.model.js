export default function (sequelize, Sequelize) {
  const PaymentLinks = sequelize.define("payment_links", {
    code: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    usernames: {
      type: Sequelize.JSONB,
      default: []
    },
    expire_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING, // expired, paid , active
      default: 'active'
    },
    amount: {
      type: Sequelize.INTEGER
    }
  });

  return PaymentLinks;
}