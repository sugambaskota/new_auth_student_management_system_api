import express from 'express';
import moment from 'moment';
import { Model } from 'sequelize/types';
const router = express.Router();
const UserLoginInfo = require('../models/user_login_info_model');
const Marks = require('../models/marks_model');
const auth = require('../middleware/auth');
const marksDto = require('../dto/marks_dto');
const sequelize = require('../db/sequelize');

router.get('/marks', auth, async (req: any, res: any) => {
    if (req.user.role == 'student') {
        return res.status(401).send();
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
        return res.status(401).send();
    }
    try {
        await UserLoginInfo.update({
            expiresAt: moment().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        let marks = await Marks.findAll();
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
        return res.status(401).send();
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
        return res.status(401).send();
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
        return res.status(401).send();
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

router.patch('/marks/:id', auth, async (req: any, res: any) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['MARKS'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).json({ ERROR: 'Invalid updates!' });
    }
    if (req.user.role == 'student') {
        return res.status(401).send();
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

module.exports = router;