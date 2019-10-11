import { User } from '../models/user_model';
import { Subject } from '../models/subject_model';

let marksIn: any = (marks: any) => {
    return {
        "studentId": marks.STUDENT_ID,
        "subjectId": marks.SUBJECT_ID,
        "marks": marks.MARKS,
        "teacherId": marks.TEACHER_ID
    }
}

let marksOut: any = (marks: any) => {
    return {
        "ID": marks.uuid,
        "STUDENT_ID": marks.studentId,
        "SUBJECT_ID": marks.subjectId,
        "MARKS": marks.marks,
        "TEACHER_ID": marks.teacherId
    }
}

let marksheetOut: any = async function (marks: any) {
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
}

let fromUpdate: any = (marks: any) => {
    return {
        "marks": marks.MARKS
    }
}

export {
    marksIn,
    marksOut,
    marksheetOut,
    fromUpdate
};