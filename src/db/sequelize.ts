import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(`${process.env.DB_URL}`);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

  sequelize.sync();

module.exports = sequelize;