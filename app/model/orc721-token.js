module.exports = app => {
  const {CHAR} = app.Sequelize

  let ORC721Token = app.model.define('orc721_token', {
    contractAddress: {
      type: CHAR(20).BINARY,
      primaryKey: true
    },
    tokenId: {
      type: CHAR(32).BINARY,
      primaryKey: true
    },
    holder: CHAR(20).BINARY
  }, {freezeTableName: true, underscored: true, timestamps: false})

  ORC721Token.associate = () => {
    const {Contract} = app.model
    Contract.hasMany(ORC721Token, {as: 'orc721Tokens', foreignKey: 'contractAddress'})
    ORC721Token.belongsTo(Contract, {as: 'contract', foreignKey: 'contractAddress'})
  }

  return ORC721Token
}
