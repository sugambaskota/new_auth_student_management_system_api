"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = __importDefault(require("sequelize"));
const router = express_1.default.Router();
const UserLoginInfo = require('../models/user_login_info_model');
const Marks = require('../models/marks_model');
const auth = require('../middleware/auth');
const marksDto = require('../dto/marks_dto');
const sequelize = require('../db/sequelize');
const Op = sequelize_1.default.Op;
router.get('/marks', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role == 'student') {
        return res.status(403).send();
    }
    try {
        yield UserLoginInfo.update({
            expiresAt: moment_1.default().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        let marks = yield Marks.findAll({
            where: {
                teacherId: req.user.uuid
            }
        });
        for (let i = 0; i < marks.length; i++) {
            marks[i] = marksDto.marksOut(marks[i]);
        }
        res.status(200).json(marks);
    }
    catch (e) {
        res.status(500).send();
    }
}));
router.get('/marks-all', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role != 'admin') {
        return res.status(403).send();
    }
    try {
        yield UserLoginInfo.update({
            expiresAt: moment_1.default().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        let options = {
            where: {},
        };
        if (req.query.limit) {
            options.limit = parseInt(req.query.limit);
        }
        if (req.query.offset) {
            options.offset = parseInt(req.query.offset);
        }
        if (req.query.studentId) {
            options.where.studentId = req.query.studentId;
        }
        if (req.query.teacherId) {
            options.where.teacherId = req.query.teacherId;
        }
        if (req.query.subjectId) {
            options.where.subjectId = req.query.subjectId;
        }
        if (req.query.gt) {
            options.where.marks = {
                [Op.gt]: parseInt(req.query.gt)
            };
        }
        let marks = yield Marks.findAll(options);
        for (let i = 0; i < marks.length; i++) {
            marks[i] = marksDto.marksOut(marks[i]);
        }
        res.status(200).json(marks);
    }
    catch (e) {
        res.status(500).send();
    }
}));
router.post('/marks', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role == 'student') {
        return res.status(403).send();
    }
    try {
        yield UserLoginInfo.update({
            expiresAt: moment_1.default().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        let toDto = marksDto.marksIn(req.body);
        toDto.teacherId = req.user.uuid;
        yield Marks.create(toDto);
        res.status(201).send();
    }
    catch (e) {
        res.status(400).send();
    }
}));
router.post('/marks-bulk', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role == 'student') {
        return res.status(403).send();
    }
    try {
        yield UserLoginInfo.update({
            expiresAt: moment_1.default().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        for (let i = 0; i < req.body.length; i++) {
            req.body[i] = marksDto.marksIn(req.body[i]);
            req.body[i].teacherId = req.user.uuid;
        }
        yield Marks.bulkCreate(req.body);
        res.status(201).send();
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.delete('/marks/:id', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role == 'student') {
        return res.status(403).send();
    }
    try {
        yield UserLoginInfo.update({
            expiresAt: moment_1.default().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        let marksOne = yield Marks.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!marksOne) {
            return res.status(404).send();
        }
        yield marksOne.destroy();
        res.status(202).send();
    }
    catch (e) {
        res.status(400).send();
    }
}));
router.put('/marks/:id', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield UserLoginInfo.update({
            expiresAt: moment_1.default().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        const marks = yield Marks.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!marks) {
            return res.sendStatus(404).send();
        }
        let toDto = marksDto.fromUpdate(req.body);
        yield sequelize.query(`set myvar.userid="${req.user.uuid}"`);
        yield marks.update(toDto);
        res.status(202).send();
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
module.exports = router;
//# sourceMappingURL=marks_router.js.map