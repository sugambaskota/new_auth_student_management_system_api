import Sequelize from 'sequelize';
import { sequelize } from '../db/sequelize';

const Marks: any = sequelize.define('marks', {
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

export { Marks };