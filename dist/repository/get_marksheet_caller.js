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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = require("../db/sequelize");
let get_marksheet_caller = function (options) {
    return __awaiter(this, void 0, void 0, function* () {
        let optionsArray = Object.keys(options);
        let sql = 'SELECT * FROM get_marksheet(';
        for (let i = 0; i < optionsArray.length; i++) {
            sql = (i == (optionsArray.length - 1) ? sql + ':' + optionsArray[i] + ')' : sql + ':' + optionsArray[i] + ',');
            // if (i == (optionsArray.length -1)) {
            //     sql = sql + ':' + optionsArray[i] + ')';
            // }
            // else {
            //     sql = sql + ':' + optionsArray[i] + ',';
            // }
        }
        let result = yield sequelize_2.sequelize.query(sql, {
            replacements: options,
            type: sequelize_1.default.QueryTypes.SELECT
        });
        return result;
    });
};
exports.get_marksheet_caller = get_marksheet_caller;
//# sourceMappingURL=get_marksheet_caller.js.map