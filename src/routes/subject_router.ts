import express from 'express';
import moment from 'moment';
import { Model } from 'sequelize/types';
const router = express.Router();
const Subject = require('../models/subject_model');
const UserLoginInfo = require('../models/user_login_info_model');
const auth = require('../middleware/auth');
const subjectDto = require('../dto/subject_dto');

router.get('/subjects', auth, async (req: any, res: any) => {
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
        let subjects = await Subject.findAll();
        for (let i = 0; i < subjects.length; i++) {
            subjects[i] = subjectDto.subjectOut(subjects[i]);
        }
        res.status(200).json(subjects);
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/subjects', auth, async (req: any, res: any) => {
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
        let toDto = subjectDto.subjectIn(req.body);
        const subject = await Subject.create(toDto);
        let fromDto = subjectDto.subjectOut(subject);
        res.status(201).send(fromDto);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/subjects-bulk', auth, async (req: any, res: any) => {
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
        for (let i = 0; i < req.body.length; i++) {
            req.body[i] = subjectDto.subjectIn(req.body[i]);
        }
        await Subject.bulkCreate(req.body);
        res.status(201).send();
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/subjects/:id', auth, async (req: any, res: any) => {
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
        let subject: Model = await Subject.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!subject) {
            return res.status(404).send();
        }
        await subject.destroy();
        res.status(202).send();
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/subjects/:id', auth, async (req: any, res: any) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['NAME'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).json({ ERROR: 'Invalid updates!' });
    }
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
        const subject: Model = await Subject.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!subject) {
            return res.sendStatus(404).send();
        }
        let toDto = subjectDto.subjectIn(req.body)
        await subject.update(toDto);
        res.status(202).send();
    } catch (e) {
        res.status(400).send();
    }
});

module.exports = router;