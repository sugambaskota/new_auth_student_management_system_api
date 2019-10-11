let userIn: any = (user: any) => {
    return {
        "name": user.NAME,
        "email": user.EMAIL,
        "password": user.PASSWORD,
        "role": user.ROLE
    }
}

let userOut: any = (user: any) => {
    return {
        "ID": user.uuid,
        "NAME": user.name,
        "EMAIL": user.email,
        "ROLE": user.role
    }
}

let fromLogin: any = (user: any) => {
    return {
        "email": user.EMAIL,
        "password": user.PASSWORD
    }
}

let fromUpdate: any = (user: any) => {
    let dto: any = {};
    if (user.EMAIL) {
        dto.email = user.EMAIL;
    }
    if (user.NAME) {
        dto.name = user.NAME;
    }
    if (user.PASSWORD) {
        dto.password = user.PASSWORD;
    }
    return dto;
}

export {
    userIn,
    userOut,
    fromLogin,
    fromUpdate
}
