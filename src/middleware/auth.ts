import moment from 'moment';
import { Op } from 'sequelize';
import { User } from '../models/user_model';
import { UserLoginInfo } from '../models/user_login_info_model';

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

export { auth };