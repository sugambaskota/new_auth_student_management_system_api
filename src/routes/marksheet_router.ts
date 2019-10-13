import moment from 'moment';
import { Router } from 'express';
import { UserLoginInfo } from '../models/user_login_info_model';
import { Marks } from '../models/marks_model';
import { auth } from '../middleware/auth';
import * as marksDto from '../dto/marks_dto';
import * as marksheetCaller from '../repository/get_marksheet_caller';

const router = Router();

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

        if (req.query.LIMIT && req.query.PAGE) {
            options.limitvalue = parseInt(req.query.LIMIT);
            options.offsetvalue = parseInt(req.query.LIMIT) * (parseInt(req.query.PAGE) - 1);
        } else if (req.query.LIMIT) {
            options.limitvalue = parseInt(req.query.LIMIT);
        }

        if (req.query.STUDENT_ID) {
            options.studentid = req.query.STUDENT_ID;
            
        }

        if (req.query.TEACHER_ID) {
            options.teacherid = req.query.TEACHER_ID;
        }

        if (req.query.SUBJECT_ID) {
            options.subjectid = req.query.SUBJECT_ID;
        }

        if (req.query.GT && req.query.LT) {
            options.marksgt = parseInt(req.query.GT);
            options.markslt = parseInt(req.query.LT);
        } else if (req.query.GT) {
            options.marksgt = parseInt(req.query.GT);
        } else if (req.query.LT) {
            options.markslt = parseInt(req.query.LT);
        }

        if (req.query.ORDER_BY) {
            options.orderby = req.query.ORDER_BY
        }

        if (req.query.SEARCH_TEXT) {
            options.searchtext = req.query.SEARCH_TEXT;
        }

        let result = await marksheetCaller.get_marksheet_caller(options);
        res.json(result);
    } catch (e) {
        res.status(500).send();
    }
});

export { router };