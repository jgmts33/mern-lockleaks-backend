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
    }
  });

  return User;
}