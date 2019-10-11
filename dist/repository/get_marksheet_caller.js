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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../db/sequelize");
let get_marksheet_caller = function (options) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield sequelize_1.sequelize.query(`SELECT * from get_marksheet();`);
        return result;
    });
};
exports.get_marksheet_caller = get_marksheet_caller;
//# sourceMappingURL=get_marksheet_caller.js.map