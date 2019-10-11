"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let userIn = (user) => {
    return {
        "name": user.NAME,
        "email": user.EMAIL,
        "password": user.PASSWORD,
        "role": user.ROLE
    };
};
exports.userIn = userIn;
let userOut = (user) => {
    return {
        "ID": user.uuid,
        "NAME": user.name,
        "EMAIL": user.email,
        "ROLE": user.role
    };
};
exports.userOut = userOut;
let fromLogin = (user) => {
    return {
        "email": user.EMAIL,
        "password": user.PASSWORD
    };
};
exports.fromLogin = fromLogin;
let fromUpdate = (user) => {
    let dto = {};
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
};
exports.fromUpdate = fromUpdate;
//# sourceMappingURL=user_dto.js.map