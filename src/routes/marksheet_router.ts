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

        let options: object = {
            studentid: req.query.STUDENT_ID ? req.query.STUDENT_ID : '',
            teacherid: req.query.TEACHER_ID ? req.query.TEACHER_ID : '',
            subjectid: req.query.SUBJECT_ID ? req.query.SUBJECT_ID : '',
            marksgt: req.query.GT ? req.query.GT : '',
            markslt: req.query.LT ? req.query.LT : '',
            orderby: req.query.ORDER_BY ? req.query.ORDER_BY : '',
            limitvalue: req.query.LIMIT ? req.query.LIMIT : '',
            offsetvalue: req.query.PAGE ? (parseInt(req.query.LIMIT) * (parseInt(req.query.PAGE) - 1)).toString : '',
            searchtext: req.query.SEARCH_TEXT ? req.query.SEARCH_TEXT : '',
        };

        let result = await marksheetCaller.get_marksheet_caller(options);
        res.json(result);
        
    } catch (e) {
        res.status(500).send();
    }
});

export { router };