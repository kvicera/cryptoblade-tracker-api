const Web3 = require("web3")
const web3 = new Web3("https://bsc-dataseed1.defibit.io/")

const CheckAddress = (address) => {
  return web3.utils.isAddress(address)
}

module.exports = {
  CheckAddress,
}
