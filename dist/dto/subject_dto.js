"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let subjectIn = (subject) => {
    return {
        "name": subject.NAME
    };
};
exports.subjectIn = subjectIn;
let subjectOut = (subject) => {
    return {
        "UUID": subject.uuid,
        "NAME": subject.name
    };
};
exports.subjectOut = subjectOut;
//# sourceMappingURL=subject_dto.js.map