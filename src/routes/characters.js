const express = require('express')
const Common = require('../cryptoblades/Common.js')
const app = express.Router()

app.get('/getCharacters', (req, res) => {
  try {
    const address = req.query.address

    if (Common.utils.CheckAddress(address)) {
      Common.Connections.conCryptoBlades.methods
        .getMyCharacters()
        .call({ from: address })
        .then(function (result) {
          res.send(result)
        })
    } else {
      res.send('Error: Invalid address passed in url parameter!')
    }
  } catch (err) {
    res.send('Error!')
  }
})

app.get('/getCharacterData', (req, res) => {
  try {
    const charId = req.query.charId

    if (charId !== '') {
      Common.Connections.conCharacters.methods
        .get(charId)
        .call({ from: Common.Addresses.defaultAddress })
        .then(function (result) {
          let charData = Common.Characters.CharacterData(charId, result)

          Common.Connections.conCharacters.methods
            .getStaminaPoints(charId)
            .call({ from: Common.Addresses.defaultAddress })
            .then(function (result_stamina) {
              charData['stamina'] = result_stamina
              res.send(charData)
            })
        })
    } else {
      res.send('Error: Invalid address passed in url parameter!')
    }
  } catch (err) {
    res.send('Error!')
  }
})

app.get('/getEnemies', (req, res) => {
  try {
    const charId = req.query.charId
    const weaponId = req.query.weapId

    if (charId !== '' && weaponId !== '') {
      Common.Connections.conCryptoBlades.methods
        .getTargets(charId, weaponId)
        .call({ from: Common.Addresses.defaultAddress })
        .then(function (result) {
          res.send(Common.Characters.getEnemyDetails(result))
        })
    } else {
		res.send('Error: Invalid charId or weapId in url parameter!')
    }
  } catch (err) {
    res.send('Error!')
  }
})

module.exports = app
