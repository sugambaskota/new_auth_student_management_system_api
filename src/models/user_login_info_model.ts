import Sequelize from 'sequelize';
import { sequelize } from '../db/sequelize';

const UserLoginInfo: any = sequelize.define('userLoginInfos', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    userId: {
        type: Sequelize.INTEGER
    },
    loggedInDateTime: {
        type: Sequelize.DATE
    },
    loggedOutDateTime: {
        type: Sequelize.DATE,
        allowNull: true
    },
    expiresAt: {
        type: Sequelize.DATE
    }
}, {
    timestamps: true,
    paranoid: true
});

export { UserLoginInfo };