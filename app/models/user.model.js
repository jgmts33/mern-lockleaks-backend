export default function (sequelize, Sequelize) {
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
    },
    avatar: {
      type: Sequelize.STRING,
      defaultValue: ""
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    subscription: {
      type: Sequelize.JSONB,
      defaultValue: {
        plan_id: null,
        payment_method: null,
        status: '',
        expire_date: null
      }
    },
    social: {
      type: Sequelize.STRING,
      defaultValue: ""
    },
    agency: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    user_counts: {
      type: Sequelize.INTEGER,
      default: 0
    },
    users_info_images: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      default: []
    },
    ban: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    contract: {
      type: Sequelize.JSONB,
      default: {
        status: ""
      }
    },
    copyright_holder: {
      type: Sequelize.STRING,
      default: ""
    },
    ip: {
      type: Sequelize.STRING,
      default: ""
    },
    data_report: {
      type: Sequelize.STRING,
      default: ""
    },
    data_analytics: {
      type: Sequelize.STRING,
      default: ""
    }
  });

  return User;
}