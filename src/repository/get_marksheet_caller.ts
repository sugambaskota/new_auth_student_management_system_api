const sequelize = require('../db/sequelize');

module.exports = {
    get_marksheet_caller: async function(options: object) {
        let result = await sequelize.query(`SELECT * from get_marksheet();`);
        return result;
    }
}