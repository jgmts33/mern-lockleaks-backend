import config from '../config/auth.config.js';
import { v4 as uuidv4 } from 'uuid';

export default function (sequelize, Sequelize) {

  const RefreshToken = sequelize.define("refreshToken", {
    token: {
      type: Sequelize.STRING
    },
    expires: {
      type: Sequelize.DATE
    }
  });

  RefreshToken.createToken = async function (user) {
    let expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRegreshExpiration);

    let _token = uuidv4();

    await this.create({
      token: _token,
      userId: user.id,
      expires: expiredAt.getTime()
    });

    return _token;
  }

  RefreshToken.verifyExpiration = (token) => {
    return token.expires.getTime() < new Date().getTime()
  };

  return RefreshToken;

}