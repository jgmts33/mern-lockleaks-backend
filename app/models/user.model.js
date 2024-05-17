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
      allowNull: false
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
        payment_method: null,
        expire_date: null
      }
    },
    social: {
      type: Sequelize.STRING,
      defaultValue: ""
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });

  return User;
}