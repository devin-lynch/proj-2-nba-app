'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class player_team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  player_team.init({
    player_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'player_team',
  });
  return player_team;
};