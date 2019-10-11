import dotenv from 'dotenv';

dotenv.config({
    path: __dirname + '/../config/dev.env'
});

import express from 'express';
import * as subjectRouter from './routes/subject_router';
import * as userRouter from './routes/user_router';
import * as marksRouter from './routes/marks_router';
import * as marksheetRouter from './routes/marksheet_router';
import * as studentRouter from './routes/student_router';
import * as notFoundRouter from './routes/404_router';

//Connect to Postgres database
import './db/sequelize';

//Initializing app variable
const app = express();
app.use(express.json());

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

