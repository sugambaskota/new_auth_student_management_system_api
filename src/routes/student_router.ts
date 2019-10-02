import express from 'express';
import moment from 'moment';
const router = express.Router();
const UserLoginInfo = require('../models/user_login_info_model');
const Users = require('../models/user_model');
const auth = require('../middleware/auth');
const userDto = require('../dto/user_dto');

router.get('/students', auth, async (req: any, res: any) => {
    if (req.user.role == 'student') {
        return res.status(403).send();
    }
    try {
        await UserLoginInfo.update({
            expiresAt: moment().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        let students = await Users.findAll({
            where: {
                role: 'student'
            }
        });
        for (let i = 0; i < students.length; i++) {
            students[i] = userDto.userOut(students[i]);
        }
        res.status(200).json(students);
    } catch (e) {
        res.status(500).send();
    }
});

router.delete('/students/remove/:id', auth, async (req: any, res: any) => {
    if (req.user.role != 'admin') {
        return res.status(403).send();
    }
    try {
        await UserLoginInfo.update({
            expiresAt: moment().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        const student = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        });
        await student.destroy();
        res.status(202).send();
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;