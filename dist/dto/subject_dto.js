"use strict";
module.exports = {
    subjectIn: (subject) => {
        return {
            "name": subject.NAME
        };
    },
    subjectOut: (subject) => {
        return {
            "UUID": subject.uuid,
            "NAME": subject.name
        };
    }
};
//# sourceMappingURL=subject_dto.js.map