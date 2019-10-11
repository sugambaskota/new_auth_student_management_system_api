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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const express_1 = require("express");
const sequelize_1 = require("sequelize");
const user_login_info_model_1 = require("../models/user_login_info_model");
const marks_model_1 = require("../models/marks_model");
const auth_1 = require("../middleware/auth");
const marksDto = __importStar(require("../dto/marks_dto"));
const sequelize_2 = require("../db/sequelize");
const router = express_1.Router();
exports.router = router;
router.get('/marks', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role == 'student') {
        return res.status(403).send();
    }
    try {
        yield user_login_info_model_1.UserLoginInfo.update({
            expiresAt: moment_1.default().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        let marks = yield marks_model_1.Marks.findAll({
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
router.get('/marks-all', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role != 'admin') {
        return res.status(403).send();
    }
    try {
        yield user_login_info_model_1.UserLoginInfo.update({
            expiresAt: moment_1.default().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        let options = {};
        let optionsWhere = {};
        if (req.query.limit && req.query.page) {
            options.limit = parseInt(req.query.limit);
            options.offset = parseInt(req.query.limit) * (parseInt(req.query.page) - 1);
        }
        else if (req.query.limit) {
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
                [sequelize_1.Op.gt]: parseInt(req.query.gt),
                [sequelize_1.Op.lt]: parseInt(req.query.lt),
            };
            options.where = optionsWhere;
        }
        else if (req.query.gt) {
            optionsWhere.marks = {
                [sequelize_1.Op.gt]: parseInt(req.query.gt)
            };
            options.where = optionsWhere;
        }
        else if (req.query.lt) {
            optionsWhere.marks = {
                [sequelize_1.Op.lt]: parseInt(req.query.lt)
            };
            options.where = optionsWhere;
        }
        let marks = yield marks_model_1.Marks.findAll(options);
        for (let i = 0; i < marks.length; i++) {
            marks[i] = marksDto.marksOut(marks[i]);
        }
        res.status(200).json(marks);
    }
    catch (e) {
        res.status(500).send();
    }
}));
router.post('/marks', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role == 'student') {
        return res.status(403).send();
    }
    try {
        yield user_login_info_model_1.UserLoginInfo.update({
            expiresAt: moment_1.default().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        let toDto = marksDto.marksIn(req.body);
        toDto.teacherId = req.user.uuid;
        yield marks_model_1.Marks.create(toDto);
        res.status(201).send();
    }
    catch (e) {
        res.status(400).send();
    }
}));
router.post('/marks-bulk', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role == 'student') {
        return res.status(403).send();
    }
    try {
        yield user_login_info_model_1.UserLoginInfo.update({
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
        yield marks_model_1.Marks.bulkCreate(req.body);
        res.status(201).send();
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.delete('/marks/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role == 'student') {
        return res.status(403).send();
    }
    try {
        yield user_login_info_model_1.UserLoginInfo.update({
            expiresAt: moment_1.default().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        let marksOne = yield marks_model_1.Marks.findOne({
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
router.put('/marks/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield user_login_info_model_1.UserLoginInfo.update({
            expiresAt: moment_1.default().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        const marks = yield marks_model_1.Marks.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!marks) {
            return res.sendStatus(404).send();
        }
        let toDto = marksDto.fromUpdate(req.body);
        yield sequelize_2.sequelize.query(`set myvar.userid="${req.user.uuid}"`);
        yield marks.update(toDto);
        res.status(202).send();
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
//# sourceMappingURL=marks_router.js.map