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
const router = express_1.default.Router();
const UserLoginInfo = require('../models/user_login_info_model');
const Marks = require('../models/marks_model');
const User = require('../models/user_model');
const Subject = require('../models/subject_model');
const auth = require('../middleware/auth');
const marksDto = require('../dto/marks_dto');
const marksheetCaller = require('../repository/get_marksheet_caller');
router.get('/marksheet', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role != 'student') {
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
                studentId: req.user.uuid
            }
        });
        for (let i = 0; i < marks.length; i++) {
            marks[i] = yield marksDto.marksheetOut(marks[i]);
        }
        res.status(200).json(marks);
    }
    catch (e) {
        res.status(500).send();
    }
}));
router.get('/marksheet/:id', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const marks = yield Marks.findAll({
            where: {
                studentId: req.params.id
            }
        });
        for (let i = 0; i < marks.length; i++) {
            marks[i] = yield marksDto.marksheetOut(marks[i]);
        }
        res.status(200).json(marks);
    }
    catch (e) {
        res.status(500).send();
    }
}));
router.get('/marksheet-all', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let options = {};
        if (req.query.limit && req.query.page) {
            options.LIMIT = parseInt(req.query.limit);
            options.OFFSET = parseInt(req.query.limit) * (parseInt(req.query.page) - 1);
        }
        else if (req.query.limit) {
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
            };
        }
        else if (req.query.gt) {
            options.MARKS = {
                GT: parseInt(req.query.gt)
            };
        }
        else if (req.query.lt) {
            options.MARKS = {
                LT: parseInt(req.query.lt)
            };
        }
        let result = yield marksheetCaller.get_marksheet_caller(options);
        res.json(result);
    }
    catch (e) {
        res.status(500).send();
    }
}));
module.exports = router;
//# sourceMappingURL=marksheet_router.js.map