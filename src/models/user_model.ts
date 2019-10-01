import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
import moment from 'moment';
const sequelize = require('../db/sequelize');
const UserLoginInfo = require('./user_login_info_model');

const User = sequelize.define('users', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [5, 20]
    },
    role: {
        type: Sequelize.ENUM('admin', 'teacher', 'student'),
        defaultValue: 'student'
    }
}, {
    timestamps: true,
    paranoid: true
});


User.findByCredentials = async (email: string, password: string) => {
    const user: any = await User.findOne({
        where: {
            email
        }
    });
    if (!user) {
        throw Error('Unable to login!');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw Error('Unable to login!');
    }
    return user;
}

User.prototype.generateAuthToken = async function () {
    const user = this;
    const now = moment().format();
    const userLoginInfo = await UserLoginInfo.create({
        userId: user.id,
        loggedInDateTime: now,
        expiresAt: moment().add('2', 'hours')
    });
    return userLoginInfo.uuid;
}

User.beforeCreate(async (user: any, options: any) => {
    let hashedPw = await bcrypt.hash(user.password, 8);
    user.password = hashedPw;
});

User.beforeUpdate((user: any, options: any) => {
    const password = user.password;
    if (user.changed('password')) {
        return bcrypt.hash(password, 8).then((hashedPw: string) => {
            user.password = hashedPw;
        });
    } else {
        return null;
    }
});

module.exports = User;