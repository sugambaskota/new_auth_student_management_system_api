let subjectIn: any = (subject: any) => {
    return {
        "name": subject.NAME
    }
}

let subjectOut: any = (subject: any) => {
    return {
        "UUID": subject.uuid,
        "NAME": subject.name
    }
}

export {
    subjectIn,
    subjectOut
};