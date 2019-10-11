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
const express_1 = require("express");
const moment_1 = __importDefault(require("moment"));
const subject_model_1 = require("../models/subject_model");
const user_login_info_model_1 = require("../models/user_login_info_model");
const auth_1 = require("../middleware/auth");
const subjectDto = __importStar(require("../dto/subject_dto"));
const router = express_1.Router();
exports.router = router;
router.get('/subjects', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let subjects = yield subject_model_1.Subject.findAll();
        for (let i = 0; i < subjects.length; i++) {
            subjects[i] = subjectDto.subjectOut(subjects[i]);
        }
        res.status(200).json(subjects);
    }
    catch (e) {
        res.status(500).send();
    }
}));
router.post('/subjects', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let toDto = subjectDto.subjectIn(req.body);
        const subject = yield subject_model_1.Subject.create(toDto);
        let fromDto = subjectDto.subjectOut(subject);
        res.status(201).send(fromDto);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.post('/subjects-bulk', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        for (let i = 0; i < req.body.length; i++) {
            req.body[i] = subjectDto.subjectIn(req.body[i]);
        }
        yield subject_model_1.Subject.bulkCreate(req.body);
        res.status(201).send();
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.delete('/subjects/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let subject = yield subject_model_1.Subject.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!subject) {
            return res.status(404).send();
        }
        yield subject.destroy();
        res.status(202).send();
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.put('/subjects/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield user_login_info_model_1.UserLoginInfo.update({
            expiresAt: moment_1.default().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        const subject = yield subject_model_1.Subject.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!subject) {
            return res.sendStatus(404).send();
        }
        let toDto = subjectDto.subjectIn(req.body);
        yield subject.update(toDto);
        res.status(202).send();
    }
    catch (e) {
        res.status(400).send();
    }
}));
//# sourceMappingURL=subject_router.js.map