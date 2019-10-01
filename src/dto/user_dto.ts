module.exports = {
    userIn: (user: any) => {
        return {
            "name": user.NAME,
            "email": user.EMAIL,
            "password": user.PASSWORD,
            "role": user.ROLE
        }
    },
    userOut: (user: any) => {
        return {
            "ID": user.uuid,
            "NAME": user.name,
            "EMAIL": user.email,
            "ROLE": user.role
        }
    },
    fromLogin: (user: any) => {
        return {
            "email": user.EMAIL,
            "password": user.PASSWORD 
        }
    },
    fromUpdate: (user: any) => {

        let dto : any = {};
        
        if(user.EMAIL)
        {
            dto.email = user.EMAIL;
        }

        if(user.NAME)
        {
            dto.name = user.NAME;
        }

        if(user.PASSWORD)
        {
            dto.password = user.PASSWORD;
        }

        return dto;
    
    }
}
