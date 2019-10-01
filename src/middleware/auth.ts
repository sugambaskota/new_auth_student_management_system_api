const moment = require('moment');
import Sequelize from 'sequelize';
const User = require('../models/user_model');
const UserLoginInfo = require('../models/user_login_info_model');
const Op = Sequelize.Op;

const auth = async (req: any, res: any, next: any) => {
    try {
        let now = moment().format();
        const token = req.header('Authorization').replace('Bearer ', '');
        const userLoginInfo = await UserLoginInfo.findOne({
            where: {
                uuid: token,
                loggedOutDateTime: null,
                expiresAt: {
                    [Op.gt]: now
                },
            }
        });
        if (!userLoginInfo) {
            throw new Error();
        }
        const user = await User.findOne({
            where: {
                id: userLoginInfo.userId
            }
        });
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).json({ error: "Please authenticate!" })
    }
}

module.exports = auth;