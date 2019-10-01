//Setting environment variable at app start
import dotenv from 'dotenv';
dotenv.config({
    path: __dirname + '/../config/dev.env'
});

//Now other imports
import express from 'express';

//Connect to Postgres database
require('./db/sequelize');

//Initializing app variable
const app = express();
app.use(express.json());

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

