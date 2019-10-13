"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: __dirname + '/../config/dev.env'
});
const express_1 = __importDefault(require("express"));
const subjectRouter = __importStar(require("./routes/subject_router"));
const userRouter = __importStar(require("./routes/user_router"));
const marksRouter = __importStar(require("./routes/marks_router"));
const marksheetRouter = __importStar(require("./routes/marksheet_router"));
const studentRouter = __importStar(require("./routes/student_router"));
const notFoundRouter = __importStar(require("./routes/404_router"));
//Connect to Postgres database
require("./db/sequelize");
//Initializing app variable
const app = express_1.default();
app.use(express_1.default.json());
//Routers go here
app.use(subjectRouter.router);
app.use(userRouter.router);
app.use(marksRouter.router);
app.use(marksheetRouter.router);
app.use(studentRouter.router);
app.use(notFoundRouter.router);
//Grab port from env
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is up at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map