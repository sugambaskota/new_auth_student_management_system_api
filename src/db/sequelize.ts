import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(`${process.env.dbURI}`);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

export { sequelize };