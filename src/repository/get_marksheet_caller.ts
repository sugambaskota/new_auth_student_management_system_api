import Sequelize from 'sequelize';
import { sequelize } from '../db/sequelize';

let get_marksheet_caller = async function (options: any) {
    let optionsArray = Object.keys(options);
    let sql: string = 'SELECT * FROM get_marksheet(';
    for (let i = 0; i < optionsArray.length; i++) {
        sql = (i == (optionsArray.length -1) ? sql + ':' + optionsArray[i] + ')' : sql + ':' + optionsArray[i] + ',' );
    }
    let result = await sequelize.query(sql, {
        replacements: options,
        type: Sequelize.QueryTypes.SELECT
    });
    return result;
}

export { get_marksheet_caller }