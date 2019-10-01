const sequelize = require('../db/sequelize');
module.exports = {
    marksIn: (marks: any) => {
        return {
            "studentId": marks.STUDENT_ID,
            "subjectId": marks.SUBJECT_ID,
            "marks": marks.MARKS,
            "teacherId": marks.TEACHER_ID
        }
    },
    marksOut: (marks: any) => {
        return {
            "ID": marks.uuid,
            "STUDENT_ID": marks.studentId,
            "SUBJECT_ID": marks.subjectId,
            "MARKS": marks.marks,
            "TEACHER_ID": marks.teacherId
        }
    },
    marksheetOut: async function(marks: any) {
        const SUBJECT = await sequelize.query(`SELECT name FROM subjects WHERE uuid::text='${marks.subjectId}';`);
        const TEACHER_NAME = await sequelize.query(`SELECT name FROM users WHERE uuid::text='${marks.teacherId}';`);
        return {
            "SUBJECT": SUBJECT,
            "MARKS": marks.marks,
            "TEACHER": TEACHER_NAME
        }
    },
    fromUpdate: (marks: any) => {
        return {
            "marks": marks.MARKS
        }
    }
}