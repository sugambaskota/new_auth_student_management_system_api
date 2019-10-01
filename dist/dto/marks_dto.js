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
const sequelize = require('../db/sequelize');
module.exports = {
    marksIn: (marks) => {
        return {
            "studentId": marks.STUDENT_ID,
            "subjectId": marks.SUBJECT_ID,
            "marks": marks.MARKS,
            "teacherId": marks.TEACHER_ID
        };
    },
    marksOut: (marks) => {
        return {
            "ID": marks.uuid,
            "STUDENT_ID": marks.studentId,
            "SUBJECT_ID": marks.subjectId,
            "MARKS": marks.marks,
            "TEACHER_ID": marks.teacherId
        };
    },
    marksheetOut: function (marks) {
        return __awaiter(this, void 0, void 0, function* () {
            const SUBJECT = yield sequelize.query(`SELECT name FROM subjects WHERE uuid::text='${marks.subjectId}';`);
            const TEACHER_NAME = yield sequelize.query(`SELECT name FROM users WHERE uuid::text='${marks.teacherId}';`);
            return {
                "SUBJECT": SUBJECT,
                "MARKS": marks.marks,
                "TEACHER": TEACHER_NAME
            };
        });
    },
    fromUpdate: (marks) => {
        return {
            "marks": marks.MARKS
        };
    }
};
//# sourceMappingURL=marks_dto.js.map