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
const user_login_info_model_1 = require("../models/user_login_info_model");
const user_model_1 = require("../models/user_model");
const auth_1 = require("../middleware/auth");
const userDto = __importStar(require("../dto/user_dto"));
const router = express_1.Router();
exports.router = router;
router.get('/students', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let students = yield user_model_1.User.findAll({
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
router.delete('/students/remove/:id', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const student = yield user_model_1.User.findOne({
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
//# sourceMappingURL=student_router.js.map