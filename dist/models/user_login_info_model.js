"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize = require('../db/sequelize');
const UserLoginInfo = sequelize.define('userLoginInfos', {
    id: {
        primaryKey: true,
        type: sequelize_1.default.INTEGER,
        autoIncrement: true
    },
    uuid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV1
    },
    userId: {
        type: sequelize_1.default.INTEGER
    },
    loggedInDateTime: {
        type: sequelize_1.default.DATE
    },
    loggedOutDateTime: {
        type: sequelize_1.default.DATE,
        allowNull: true
    },
    expiresAt: {
        type: sequelize_1.default.DATE
    }
}, {
    timestamps: true,
    paranoid: true
});
module.exports = UserLoginInfo;
//# sourceMappingURL=user_login_info_model.js.map