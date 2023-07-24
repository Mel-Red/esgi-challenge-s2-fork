const sequelize = require('../config/sequelize')
const Sequelize = require('sequelize')
const Kbis = require('./kbis')

/**
 * Entity rules
 */
const regexUuid =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/

const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

exports.userRules = {
  email: regexEmail,
  password: regexPassword,
}

/**
 * Sequelize models
 */
const Users = sequelize.define(
  'Users',
  {
    uuid: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    societyName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.DataTypes.ENUM('REJECTED', 'PENDING', 'VALIDATED'),
      allowNull: false,
    },
    kbisUuid: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      allowNull: false,
      references: 'Kbis',
      referencesKey: 'Uuid',
    },
  },
  {
    timestamps: true,
    underscored: true,
  },
)

Users.hasMany(Kbis)

module.exports = Users