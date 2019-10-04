const User = require('../models/user_model');
const Subject = require('../models/subject_model');
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
        const user = await User.findOne({
            where: {
                uuid: marks.teacherId
            },
            attributes: ['name']
        });
        const subject = await Subject.findOne({
            where: {
                uuid: marks.subjectId
            },
            attributes: ['name']
        });
        return {
            "SUBJECT": subject.name,
            "MARKS": marks.marks,
            "TEACHER": user.name
        }
    },
    fromUpdate: (marks: any) => {
        return {
            "marks": marks.MARKS
        }
    }
}