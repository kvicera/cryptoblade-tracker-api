// Addresses
const Addresses = require("./Addresses.js")
// Contracts
const Characters = require('./contracts/Characters.js')
const CryptoBlades = require("./contracts/CryptoBlades.js")
const Weapons = require("./contracts/Weapons.js")
// Connections
const Web3 = require("web3")
const web3 = new Web3("https://bsc-dataseed1.defibit.io/")

const conCryptoBlades = new web3.eth.Contract(CryptoBlades, Addresses.mainAddress)
const conCharacters = new web3.eth.Contract(Characters, Addresses.charAddress)
const conWeapons = new web3.eth.Contract(Weapons, Addresses.weapAddress);

module.exports = {
  conCryptoBlades,
  conCharacters,
  conWeapons
}
