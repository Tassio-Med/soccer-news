module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      username: Sequelize.STRING,
      role: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};