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
const user_login_info_model_1 = require("../models/user_login_info_model");
const marks_model_1 = require("../models/marks_model");
const auth_1 = require("../middleware/auth");
const marksDto = __importStar(require("../dto/marks_dto"));
const marksheetCaller = __importStar(require("../repository/get_marksheet_caller"));
const router = express_1.Router();
exports.router = router;
router.get('/marksheet', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role != 'student') {
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
router.get('/marksheet/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const marks = yield marks_model_1.Marks.findAll({
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
router.get('/marksheet-all', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let options = {
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
        let result = yield marksheetCaller.get_marksheet_caller(options);
        res.json(result);
    }
    catch (e) {
        res.status(500).send();
    }
}));
//# sourceMappingURL=marksheet_router.js.map