const express = require('express')
const Common = require('../cryptoblades/Common.js')
const app = express.Router()

app.get('/getWeapons', (req, res) => {
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

app.get('/getWeaponData', (req, res) => {
	try {
	  const weaponId = req.query.weapId
 
	  if (weaponId !== '') {
		 Common.Connections.conWeapons.methods
			.get(weaponId)
			.call({ from: Common.Addresses.defaultAddress })
			.then(function (result) {
			  let weaponData = Common.Weapons.getWeaponData(weaponId, result)
				res.send(weaponData)
			//   Common.Connections.conWeapons.methods
			// 	 .getStaminaPoints(charId)
			// 	 .call({ from: Common.Addresses.defaultAddress })
			// 	 .then(function (result_stamina) {
			// 		charData['stamina'] = result_stamina
			// 		res.send(charData)
			// 	 })
			})
	  } else {
		 res.send('Error: Invalid address passed in url parameter!')
	  }
	} catch (err) {
	  res.send('Error!' + err)
	}
 })

module.exports = app