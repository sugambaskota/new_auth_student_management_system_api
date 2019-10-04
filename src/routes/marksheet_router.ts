import express from 'express';
import moment from 'moment';
const router = express.Router();
const UserLoginInfo = require('../models/user_login_info_model');
const Marks = require('../models/marks_model');
const User = require('../models/user_model');
const Subject = require('../models/subject_model');
const auth = require('../middleware/auth');
const marksDto = require('../dto/marks_dto');
const marksheetCaller = require('../repository/get_marksheet_caller');

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
        res.status(200).json(marks);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/marksheet-all', auth, async (req: any, res: any) => {
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

        let options: any = {};

        if (req.query.limit && req.query.page) {
            options.LIMIT = parseInt(req.query.limit);
            options.OFFSET = parseInt(req.query.limit) * (parseInt(req.query.page) - 1);
        } else if (req.query.limit) {
            options.LIMIT = parseInt(req.query.limit);
        }

        if (req.query.studentId) {
            options.STUDENT_ID = req.query.studentId;
            
        }

        if (req.query.teacherId) {
            options.TEACHER_ID = req.query.teacherId;
        }

        if (req.query.subjectId) {
            options.SUBJECT_ID = req.query.subjectId;
        }

        if (req.query.gt && req.query.lt) {
            options.MARKS = {
                GT: parseInt(req.query.gt),
                LT: parseInt(req.query.lt),
            }
        } else if (req.query.gt) {
            options.MARKS = {
                GT: parseInt(req.query.gt)
            }
        } else if (req.query.lt) {
            options.MARKS = {
                LT: parseInt(req.query.lt)
            }
        }
        let result = await marksheetCaller.get_marksheet_caller(options);
        res.json(result);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;