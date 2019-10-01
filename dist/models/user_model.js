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
const sequelize_1 = __importDefault(require("sequelize"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const moment_1 = __importDefault(require("moment"));
const sequelize = require('../db/sequelize');
const UserLoginInfo = require('./user_login_info_model');
const User = sequelize.define('users', {
    id: {
        primaryKey: true,
        type: sequelize_1.default.INTEGER,
        autoIncrement: true
    },
    uuid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV1
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        len: [5, 20]
    },
    role: {
        type: sequelize_1.default.ENUM('admin', 'teacher', 'student'),
        defaultValue: 'student'
    }
}, {
    timestamps: true,
    paranoid: true
});
User.findByCredentials = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({
        where: {
            email
        }
    });
    if (!user) {
        throw Error('Unable to login!');
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw Error('Unable to login!');
    }
    return user;
});
User.prototype.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const now = moment_1.default().format();
        const userLoginInfo = yield UserLoginInfo.create({
            userId: user.id,
            loggedInDateTime: now,
            expiresAt: moment_1.default().add('2', 'hours')
        });
        return userLoginInfo.uuid;
    });
};
User.beforeCreate((user, options) => __awaiter(void 0, void 0, void 0, function* () {
    let hashedPw = yield bcryptjs_1.default.hash(user.password, 8);
    user.password = hashedPw;
}));
User.beforeUpdate((user, options) => {
    const password = user.password;
    if (user.changed('password')) {
        return bcryptjs_1.default.hash(password, 8).then((hashedPw) => {
            user.password = hashedPw;
        });
    }
    else {
        return null;
    }
});
module.exports = User;
//# sourceMappingURL=user_model.js.map