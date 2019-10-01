import Sequelize from 'sequelize';
const sequelize = require('../db/sequelize');

const Marks = sequelize.define('marks', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    studentId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    subjectId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    marks: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    teacherId: {
        type: Sequelize.UUID
    }
}, {
    timestamps: true,
    paranoid: true
});

module.exports = Marks;