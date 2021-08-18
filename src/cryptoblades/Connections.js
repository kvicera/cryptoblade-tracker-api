// Addresses
const Addresses = require("./Addresses.js")
// Contracts
const Characters = require('./contracts/Characters.js')
const CryptoBlades = require("./contracts/CryptoBlades.js")
const Weapons = require("./contracts/Weapons.js")
const IStakingRewards = require("./contracts/IStakingRewards.js")
const IERC20 = require("./contracts/IERC20.js")
// Connections
const Web3 = require("web3")
const web3 = new Web3("https://bsc-dataseed1.defibit.io/")

const conCryptoBlades = new web3.eth.Contract(CryptoBlades, Addresses.mainAddress)
const conCharacters = new web3.eth.Contract(Characters, Addresses.charAddress)
const conWeapons = new web3.eth.Contract(Weapons, Addresses.weapAddress);
const conStakingReward = new web3.eth.Contract(IStakingRewards, Addresses.stakingRewardAddress);
const conStakingToken = new web3.eth.Contract(IERC20, Addresses.conStakingTokenAddress);

module.exports = {
  conCryptoBlades,
  conCharacters,
  conWeapons,
  conStakingReward,
  conStakingToken,
  web3
}
