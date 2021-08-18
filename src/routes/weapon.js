const express = require('express')
const Common = require('../cryptoblades/Common.js')
const router = express.Router()

router.get('/getWeapons', (req, res) => {
  try {
    const address = req.query.address

    if (Common.utils.CheckAddress(address)) {
      Common.Connections.conCryptoBlades.methods
        .getMyWeapons()
        .call({ from: address })
        .then(function (result) {
          res.send(result)
        })
    } else {
      res.send('Error: Invalid address passed in url parameter!')
    }
  } catch (err) {
    res.send('Error!' + err)
  }
})

router.get('/getWeaponData', (req, res) => {
  try {
    const weaponId = req.query.weapId

    if (weaponId !== '') {
      Common.Connections.conWeapons.methods
        .get(weaponId)
        .call({ from: Common.Addresses.defaultAddress })
        .then(function (result) {
          let weaponData = Common.Weapons.getWeaponData(weaponId, result)
          res.send(weaponData)
        })
    } else {
      res.send('Error: Invalid address passed in url parameter!')
    }
  } catch (err) {
    res.send('Error!' + err)
  }
})

module.exports = router
