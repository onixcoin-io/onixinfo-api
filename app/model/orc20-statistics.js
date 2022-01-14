module.exports = app => {
  const {INTEGER, CHAR} = app.Sequelize

  let ORC20Statistics = app.model.define('orc20_statistics', {
    contractAddress: {
      type: CHAR(20).BINARY,
      primaryKey: true
    },
    holders: INTEGER.UNSIGNED,
    transactions: INTEGER.UNSIGNED
  }, {freezeTableName: true, underscored: true, timestamps: false})

  ORC20Statistics.associate = () => {
    const {Orc20: ORC20} = app.model
    ORC20Statistics.belongsTo(ORC20, {as: 'orc20', foreignKey: 'contractAddress'})
    ORC20.hasOne(ORC20Statistics, {as: 'statistics', foreignKey: 'contractAddress'})
  }

  return ORC20Statistics
}
