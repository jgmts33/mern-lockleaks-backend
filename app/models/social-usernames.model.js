export default function (sequelize, Sequelize) {
    const SocialUsernames = sequelize.define("social_usernames", {
        username: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        }
    });

    return SocialUsernames;
}