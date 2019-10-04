"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sequelize = require('../db/sequelize');
module.exports = {
    get_marksheet_caller: function (options) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield sequelize.query(`SELECT * from get_marksheet();`);
            return result;
        });
    }
};
//# sourceMappingURL=get_marksheet_caller.js.map