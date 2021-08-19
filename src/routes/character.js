const first = require('ee-first')
const express = require('express')
const Common = require('../cryptoblades/Common.js')
const router = express.Router()

router.get('/getCharacters', (req, res) => {
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

router.get('/getCharacterData', (req, res) => {
  try {
    const charId = req.query.charId

    if (charId !== '') {
      getCharData(charId)
        .then((result) => {
          let charData = result

          getStamina(charId)
            .then((result) => {
              charData['timeUntillFull'] = (200 - result) * 5
              charData['current_stamina'] = result

              getUnclaimedExp(charId)
                .then((result) => {
                  charData['unclaimed_exp'] = result
                  res.send(charData)
                })
                .catch((err) => {
                  res.send('Error: Promise returned an error!')
                })
            })
            .catch((err) => {
              res.send('Error: Promise returned an error!')
            })
        })
        .catch((err) => {
          res.send('Error: Promise returned an error!')
        })
    } else {
      res.send('Error: Invalid address passed in url parameter!')
    }
  } catch (err) {
    res.send('Error!')
  }
})

const getCharData = (charId) => {
  return new Promise((resolve, reject) => {
    Common.Connections.conCharacters.methods
      .get(charId)
      .call({ from: Common.Addresses.defaultAddress })
      .then(function (result) {
        if (result) {
          resolve(Common.Characters.CharacterData(charId, result))
        } else {
          reject('Error')
        }
      })
  })
}

const getUnclaimedExp = (charId) => {
  return new Promise((resolve, reject) => {
    Common.Connections.conCryptoBlades.methods
      .getXpRewards(charId)
      .call({ from: Common.Addresses.defaultAddress })
      .then(function (result) {
        if (result) {
          resolve(result)
        } else {
          reject('Error')
        }
      })
  })
}

const getStamina = (charId) => {
  return new Promise((resolve, reject) => {
    Common.Connections.conCharacters.methods
      .getStaminaPoints(charId)
      .call({ from: Common.Addresses.defaultAddress })
      .then(function (result) {
        if (result) {
          resolve(result)
        } else {
          reject('Error')
        }
      })
  })
}

const getEnemies = (charId, weaponId) => {
  return new Promise((resolve, reject) => {
    Common.Connections.conCryptoBlades.methods
      .getTargets(charId, weaponId)
      .call({ from: Common.Addresses.defaultAddress })
      .then(function (result) {
        if (result) {
          resolve(result)
        } else {
          reject('Error')
        }
      })
  })
}

router.get('/getEnemies', (req, res) => {
  try {
    const charId = req.query.charId
    const weaponId = req.query.weapId

    if (charId !== '' && weaponId !== '') {
      getEnemies(charId, weaponId)
        .then((result) => {
          res.send(result)
        })
        .catch((err) => {
          res.send('Error: Promise returned an error!')
        })
    } else {
      res.send('Error: Invalid charId or weapId in url parameter!')
    }
  } catch (err) {
    res.send('Error!')
  }
})

router.get('/getWinChance', (req, res) => {
  try {
    const charId = req.query.charId
    const weapId = req.query.weapId
    const enemyPwr = req.query.enemyPwr
    const enemyElem = req.query.enemyElem

    if (charId !== '' || weapId !== '' || enemyPwr !== '' || enemyElem !== '') {
      getCharData(charId)
        .then((charData) => {
          Common.Connections.conWeapons.methods
            .get(weapId)
            .call({ from: Common.Addresses.defaultAddress })
            .then(function (weaponData) {
              weapData = Common.Weapons.getWeaponData(weapId, weaponData)

              getEnemies(charId, weapId)
                .then((targets) => {
                  const targetsData = Common.Characters.getEnemyDetails(targets)
                  
                  for(var target in targetsData){
                    targetsData[target].win_chance = Common.Characters.getWinChance(charData, weapData, targetsData[target].power, targetsData[target].trait) * 100
                  }

                  res.send(targetsData)
                })
                .catch((err) => {
                  res.send('Error: Promise returned an error!' + err)
                })
            })
        })
        .catch((err) => {
          res.send('Error: Promise returned an error!')
        })
    } else {
      res.send('Error: Invalid charId in url parameter!')
    }
  } catch (err) {
    res.send('Error!')
  }
})

module.exports = router
