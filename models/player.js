'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  player.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    position: DataTypes.STRING,
    height_feet: DataTypes.INTEGER,
    height_inches: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'player',
  });
  return player;
};