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
const user_model_1 = require("../models/user_model");
const auth_1 = require("../middleware/auth");
const UserDto = __importStar(require("../dto/user_dto"));
const user_login_info_model_1 = require("../models/user_login_info_model");
const router = express_1.Router();
exports.router = router;
router.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let toDto = UserDto.userIn(req.body);
        let user = yield user_model_1.User.create(toDto);
        let fromDto = UserDto.userOut(user);
        let token = yield user.generateAuthToken();
        res.status(201).json({
            "User": fromDto,
            "Token": token
        });
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.post('/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let toDto = UserDto.fromLogin(req.body);
        const user = yield user_model_1.User.findByCredentials(toDto.email, toDto.password);
        let fromDto = UserDto.userOut(user);
        const token = yield user.generateAuthToken();
        res.json({
            "User": fromDto,
            "Token": token
        });
    }
    catch (e) {
        res.status(404).send();
    }
}));
router.post('/users/logout', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const now = moment_1.default().format();
        yield user_login_info_model_1.UserLoginInfo.update({
            loggedOutDateTime: now
        }, {
            where: {
                uuid: req.token
            }
        });
        res.status(202).send();
    }
    catch (e) {
        res.status(404).send();
    }
}));
router.get('/users/profile', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fromDto = UserDto.userOut(req.user);
        yield user_login_info_model_1.UserLoginInfo.update({
            expiresAt: moment_1.default().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        res.status(200).json(fromDto);
    }
    catch (e) {
        res.status(408).send();
    }
}));
router.delete('/users/remove', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        yield user.destroy();
        res.status(202).send();
    }
    catch (e) {
        res.status(408).send();
    }
}));
router.put('/users/update', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['NAME', 'EMAIL', 'PASSWORD'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).json({ ERROR: 'Invalid updates!' });
    }
    try {
        yield user_login_info_model_1.UserLoginInfo.update({
            expiresAt: moment_1.default().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        let toDto = UserDto.fromUpdate(req.body);
        const result = yield user.update(toDto);
        let fromDto = UserDto.userOut(result);
        res.status(202).json(fromDto);
    }
    catch (e) {
        res.status(408).send();
    }
}));
//# sourceMappingURL=user_router.js.map