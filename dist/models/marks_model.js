"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = require("../db/sequelize");
const Marks = sequelize_2.sequelize.define('marks', {
    id: {
        primaryKey: true,
        type: sequelize_1.default.INTEGER,
        autoIncrement: true
    },
    uuid: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV1
    },
    studentId: {
        type: sequelize_1.default.UUID,
        allowNull: false
    },
    subjectId: {
        type: sequelize_1.default.UUID,
        allowNull: false
    },
    marks: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    teacherId: {
        type: sequelize_1.default.UUID
    }
}, {
    timestamps: true,
    paranoid: true
});
exports.Marks = Marks;
//# sourceMappingURL=marks_model.js.map