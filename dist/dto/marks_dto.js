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
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user_model");
const subject_model_1 = require("../models/subject_model");
let marksIn = (marks) => {
    return {
        "studentId": marks.STUDENT_ID,
        "subjectId": marks.SUBJECT_ID,
        "marks": marks.MARKS,
        "teacherId": marks.TEACHER_ID
    };
};
exports.marksIn = marksIn;
let marksOut = (marks) => {
    return {
        "ID": marks.uuid,
        "STUDENT_ID": marks.studentId,
        "SUBJECT_ID": marks.subjectId,
        "MARKS": marks.marks,
        "TEACHER_ID": marks.teacherId
    };
};
exports.marksOut = marksOut;
let marksheetOut = function (marks) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.User.findOne({
            where: {
                uuid: marks.teacherId
            },
            attributes: ['name']
        });
        const subject = yield subject_model_1.Subject.findOne({
            where: {
                uuid: marks.subjectId
            },
            attributes: ['name']
        });
        return {
            "SUBJECT": subject.name,
            "MARKS": marks.marks,
            "TEACHER": user.name
        };
    });
};
exports.marksheetOut = marksheetOut;
let fromUpdate = (marks) => {
    return {
        "marks": marks.MARKS
    };
};
exports.fromUpdate = fromUpdate;
//# sourceMappingURL=marks_dto.js.map