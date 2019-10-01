import Sequelize from 'sequelize';
const sequelize = require('../db/sequelize');

const Subject = sequelize.define('subjects', {
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

module.exports = Subject;