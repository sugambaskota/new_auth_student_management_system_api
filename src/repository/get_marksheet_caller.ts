import Sequelize from 'sequelize';
import { sequelize } from '../db/sequelize';

function myFunction(item: any, index: any, arr: any) {
    let y = item.split('=>');
    y[0] = y[0].replace(/[']/g, '');
    arr[index] = y.join('=>');
}

let get_marksheet_caller: any = async function (options: any) {
    let optionsSt = JSON.stringify(options);
    let reSt = optionsSt.replace(/[{}]/g, '').replace(/["]/g, '\'').replace(/[:]/g, '=>');
    let spSt = reSt.split(',');
    spSt.forEach(myFunction);
    let parsedSt = spSt.join(',');
    let result = await sequelize.query(`SELECT * from get_marksheet(
        ${parsedSt}
    );`, {
        type: Sequelize.QueryTypes.SELECT
    });
    return result;
}

export { get_marksheet_caller }