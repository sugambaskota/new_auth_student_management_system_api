module.exports = {
    subjectIn: (subject: any) => {
        return {
            "name": subject.NAME
        }
    },
    subjectOut: (subject: any) => {
        return {
            "UUID": subject.uuid,
            "NAME": subject.name
        }
    }
}