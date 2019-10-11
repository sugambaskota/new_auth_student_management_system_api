import Sequelize from 'sequelize';
import { sequelize } from '../db/sequelize';

let get_marksheet_caller: any = async function (options: object) {
    let result = await sequelize.query(`SELECT * from get_marksheet();`, {
        type: Sequelize.QueryTypes.SELECT
    });
    return result;
}

export { get_marksheet_caller }