const Web3 = require('web3')
const web3 = new Web3('https://bsc-dataseed1.defibit.io/')

const CheckAddress = (address) => {
  return web3.utils.isAddress(address)
}

const moveDecimal = (n) => {
  var l = n.toString().length + 2
  var v = n / Math.pow(10, l)
  return v
}

module.exports = {
  CheckAddress,
  moveDecimal
}
