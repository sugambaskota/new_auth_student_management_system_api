import express from 'express';
import moment from 'moment';
import { Sequelize } from 'sequelize';
const router = express.Router();
const UserLoginInfo = require('../models/user_login_info_model');
const Marks = require('../models/marks_model');
const User = require('../models/user_model');
const Subject = require('../models/subject_model');
const auth = require('../middleware/auth');
const marksDto = require('../dto/marks_dto');

router.get('/marksheet', auth, async (req: any, res: any) => {
    if (req.user.role != 'student') {
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
        let marks = await Marks.findAll({
            where: {
                studentId: req.user.uuid
            }
        });
        for (let i = 0; i < marks.length; i++) {
            marks[i] = await marksDto.marksheetOut(marks[i]);
        }
        res.status(200).json(marks);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/marksheet/:id', auth, async (req: any, res: any) => {
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
        const marks = await Marks.findAll({
            where: {
                studentId: req.params.id
            }
        });
        for (let i = 0; i < marks.length; i++) {
            marks[i] = await marksDto.marksheetOut(marks[i]);
        }

        // const marks = await Marks.findAll({
        //     where: {
        //         studentId: req.params.id
        //     },
        //     include: [{
        //         model: User,
        //         required: false,
        //         on: {
        //             uuid: Sequelize.col('teacherId')
        //         }
        //     }]
        // });        

        res.status(200).json(marks);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;