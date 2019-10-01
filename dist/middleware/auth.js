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
const moment = require('moment');
const sequelize_1 = __importDefault(require("sequelize"));
const User = require('../models/user_model');
const UserLoginInfo = require('../models/user_login_info_model');
const Op = sequelize_1.default.Op;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let now = moment().format();
        const token = req.header('Authorization').replace('Bearer ', '');
        const userLoginInfo = yield UserLoginInfo.findOne({
            where: {
                uuid: token,
                loggedOutDateTime: null,
                expiresAt: {
                    [Op.gt]: now
                },
            }
        });
        if (!userLoginInfo) {
            throw new Error();
        }
        const user = yield User.findOne({
            where: {
                id: userLoginInfo.userId
            }
        });
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch (e) {
        res.status(401).json({ error: "Please authenticate!" });
    }
});
module.exports = auth;
//# sourceMappingURL=auth.js.map