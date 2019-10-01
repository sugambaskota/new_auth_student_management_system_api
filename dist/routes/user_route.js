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
const User = require('../models/user_model');
const auth = require('../middleware/auth');
const UserLoginInfo = require('../models/user_login_info_model');
router.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield User.create(req.body);
        let token = yield user.generateAuthToken();
        res.status(201).json({
            "User": user,
            "Token": token
        });
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.post('/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByCredentials(req.body.email, req.body.password);
        const token = yield user.generateAuthToken();
        res.json({
            "User": user,
            "Token": token
        });
    }
    catch (e) {
        res.status(404).send(e);
    }
}));
router.post('/users/logout', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserLoginInfo.destroy({
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
router.get('/users/profile', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserLoginInfo.update({
            expiresAt: moment_1.default().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        res.status(200).json(req.user);
    }
    catch (e) {
        res.status(408).send();
    }
}));
module.exports = router;
//# sourceMappingURL=user_route.js.map