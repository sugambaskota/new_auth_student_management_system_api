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
const Users = require('../models/user_model');
const auth = require('../middleware/auth');
const userDto = require('../dto/user_dto');
router.get('/students', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let students = yield Users.findAll({
            where: {
                role: 'student'
            }
        });
        for (let i = 0; i < students.length; i++) {
            students[i] = userDto.userOut(students[i]);
        }
        res.status(200).json(students);
    }
    catch (e) {
        res.status(500).send();
    }
}));
router.delete('/students/remove/:id', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const student = yield Users.findOne({
            where: {
                uuid: req.params.id
            }
        });
        yield student.destroy();
        res.status(202).send();
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
module.exports = router;
//# sourceMappingURL=student_router.js.map