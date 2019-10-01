"use strict";
module.exports = {
    userIn: (user) => {
        return {
            "name": user.NAME,
            "email": user.EMAIL,
            "password": user.PASSWORD,
            "role": user.ROLE
        };
    },
    userOut: (user) => {
        return {
            "ID": user.uuid,
            "NAME": user.name,
            "EMAIL": user.email,
            "ROLE": user.role
        };
    },
    fromLogin: (user) => {
        return {
            "email": user.EMAIL,
            "password": user.PASSWORD
        };
    },
    fromUpdate: (user) => {
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
    }
};
//# sourceMappingURL=user_dto.js.map