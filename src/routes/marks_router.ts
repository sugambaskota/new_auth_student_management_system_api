import moment from 'moment';
import { Router } from 'express';
import { Op } from 'sequelize';
import { Model } from 'sequelize/types';
import { UserLoginInfo } from '../models/user_login_info_model';
import { Marks } from '../models/marks_model';
import { auth } from '../middleware/auth';
import * as marksDto from '../dto/marks_dto';
import { sequelize } from '../db/sequelize';

const router: any = Router();

router.get('/marks', auth, async (req: any, res: any) => {
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
        let marks = await Marks.findAll({
            where: {
                teacherId: req.user.uuid
            }
        });
        for (let i = 0; i < marks.length; i++) {
            marks[i] = marksDto.marksOut(marks[i]);
        }
        res.status(200).json(marks);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/marks-all', auth, async (req: any, res: any) => {
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
        let optionsWhere: any = {};

        if (req.query.limit && req.query.page) {
            options.limit = parseInt(req.query.limit);
            options.offset = parseInt(req.query.limit) * (parseInt(req.query.page) - 1);
        } else if (req.query.limit) {
            options.limit = parseInt(req.query.limit);
        }

        if (req.query.studentId) {
            optionsWhere.studentId = req.query.studentId;
            options.where = optionsWhere;
        }

        if (req.query.teacherId) {
            optionsWhere.teacherId = req.query.teacherId;
            options.where = optionsWhere;
        }

        if (req.query.subjectId) {
            optionsWhere.subjectId = req.query.subjectId;
            options.where = optionsWhere;
        }

        if (req.query.gt && req.query.lt) {
            optionsWhere.marks = {
                [Op.gt]: parseInt(req.query.gt),
                [Op.lt]: parseInt(req.query.lt),
            }
            options.where = optionsWhere;
        } else if (req.query.gt) {
            optionsWhere.marks = {
                [Op.gt]: parseInt(req.query.gt)
            }
            options.where = optionsWhere;
        } else if (req.query.lt) {
            optionsWhere.marks = {
                [Op.lt]: parseInt(req.query.lt)
            }
            options.where = optionsWhere;
        }

        let marks = await Marks.findAll(options);
        for (let i = 0; i < marks.length; i++) {
            marks[i] = marksDto.marksOut(marks[i]);
        }

        res.status(200).json(marks);

    } catch (e) {
        res.status(500).send();
    }
});

router.post('/marks', auth, async (req: any, res: any) => {
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
        let toDto = marksDto.marksIn(req.body);
        toDto.teacherId = req.user.uuid;
        await Marks.create(toDto);
        res.status(201).send();
    } catch (e) {
        res.status(400).send();
    }
});

router.post('/marks-bulk', auth, async (req: any, res: any) => {
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
        for (let i = 0; i < req.body.length; i++) {
            req.body[i] = marksDto.marksIn(req.body[i]);
            req.body[i].teacherId = req.user.uuid;
        }
        await Marks.bulkCreate(req.body);
        res.status(201).send();
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/marks/:id', auth, async (req: any, res: any) => {
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
        let marksOne: Model = await Marks.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!marksOne) {
            return res.status(404).send();
        }
        await marksOne.destroy();
        res.status(202).send();
    } catch (e) {
        res.status(400).send();
    }
});

router.put('/marks/:id', auth, async (req: any, res: any) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['MARKS'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).json({ ERROR: 'Invalid updates!' });
    }
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
        const marks: Model = await Marks.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!marks) {
            return res.sendStatus(404).send();
        }
        let toDto = marksDto.fromUpdate(req.body);
        await sequelize.query(`set myvar.userid="${req.user.uuid}"`);
        await marks.update(toDto);
        res.status(202).send();
    } catch (e) {
        res.status(400).send(e);
    }
});

export { router };