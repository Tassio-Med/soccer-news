module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'home_team',
        references: {
          model: 'teams',
          key: 'id',
        }
      },
      homeTeamGoals: { type: Sequelize.INTEGER, field: 'home_team_goals' },
      awayTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'away_team',
        references: {
          model: 'teams',
          key: 'id',
        }
      },
      awayTeamGoals: { type: Sequelize.INTEGER, field: 'away_team_goals' },
      inProgress: { type: Sequelize.BOOLEAN , field: 'in_progress'},
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
};