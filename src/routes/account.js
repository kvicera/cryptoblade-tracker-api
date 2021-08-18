const express = require('express')
const Common = require('../cryptoblades/Common.js')
const router = express.Router()
const request = require('postman-request')

router.get('/getBNBBalance', (req, res) => {
  try {
    const address = req.query.address

    if (Common.utils.CheckAddress(address)) {
      Common.Connections.web3.eth.getBalance(address).then(function (result) {
        // convert to human readable format then round to 6 decimal places.
        const bal = Common.Connections.web3.utils.fromWei(result)
        res.send(parseFloat(bal).toFixed(6))
      })
    } else {
      res.send('Error: Invalid address passed in url parameter!')
    }
  } catch (err) {
    res.send('Error!' + err)
  }
})

router.get('/getStakedBal', (req, res) => {
  try {
    const address = req.query.address

    if (Common.utils.CheckAddress(address)) {
      Common.Connections.conStakingReward.methods
        .balanceOf(address)
        .call({ from: Common.Addresses.defaultAddress })
        .then(function (result) {
          // convert to human readable format then round to 6 decimal places.
          const bal = Common.Connections.web3.utils.fromWei(result)
          res.send(parseFloat(bal).toFixed(6))
        })
    } else {
      res.send('Error: Invalid address passed in url parameter!')
    }
  } catch (err) {
    res.send('Error!' + err)
  }
})

router.get('/getRewardSkill', (req, res) => {
  try {
    const address = req.query.address

    if (Common.utils.CheckAddress(address)) {
      Common.Connections.conCryptoBlades.methods
        .getTokenRewards()
        .call({ from: address })
        .then(function (result) {
          // convert to human readable format then round to 6 decimal places.
          const bal = Common.Connections.web3.utils.fromWei(result)
          res.send(parseFloat(bal).toFixed(6))
        })
    } else {
      res.send('Error: Invalid address passed in url parameter!')
    }
  } catch (err) {
    res.send('Error!' + err)
  }
})

router.get('/getSkillBalance', (req, res) => {
  try {
    const address = req.query.address

    if (Common.utils.CheckAddress(address)) {
      Common.Connections.conStakingToken.methods
        .balanceOf(address)
        .call({ from: Common.Addresses.defaultAddress })
        .then(function (result) {
          res.send(
            Common.Connections.web3.utils.fromWei(
              BigInt(result).toString(),
              'ether'
            )
          )
        })
    } else {
      res.send('Error: Invalid address passed in url parameter!')
    }
  } catch (err) {
    res.send('Error!' + err)
  }
})

module.exports = router
