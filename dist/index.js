"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Setting environment variable at app start
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: __dirname + '/../config/dev.env'
});
//Now other imports
const express_1 = __importDefault(require("express"));
//Connect to Postgres database
require('./db/sequelize');
//Initializing app variable
const app = express_1.default();
app.use(express_1.default.json());
//Routers go here
app.use(require('./routes/subject_router'));
app.use(require('./routes/user_router'));
app.use(require('./routes/marks_router'));
app.use(require('./routes/marksheet_router'));
app.use(require('./routes/student_router'));
app.use(require('./routes/404_router'));
//Grab port from env
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is up at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map