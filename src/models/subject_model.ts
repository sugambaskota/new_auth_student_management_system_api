import Sequelize from 'sequelize';
import { sequelize } from '../db/sequelize';

const Subject: any = sequelize.define('subjects', {
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
    }
}, {
    timestamps: true,
    paranoid: true
});

export { Subject };