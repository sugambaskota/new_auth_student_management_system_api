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
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const user_model_1 = require("../models/user_model");
const user_login_info_model_1 = require("../models/user_login_info_model");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let now = moment_1.default().format();
        const token = req.header('Authorization').replace('Bearer ', '');
        const userLoginInfo = yield user_login_info_model_1.UserLoginInfo.findOne({
            where: {
                uuid: token,
                loggedOutDateTime: null,
                expiresAt: {
                    [sequelize_1.Op.gt]: now
                },
            }
        });
        if (!userLoginInfo) {
            throw new Error();
        }
        const user = yield user_model_1.User.findOne({
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
exports.auth = auth;
//# sourceMappingURL=auth.js.map