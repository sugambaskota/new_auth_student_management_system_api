"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = require("../db/sequelize");
const Subject = sequelize_2.sequelize.define('subjects', {
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
    }
}, {
    timestamps: true,
    paranoid: true
});
exports.Subject = Subject;
//# sourceMappingURL=subject_model.js.map