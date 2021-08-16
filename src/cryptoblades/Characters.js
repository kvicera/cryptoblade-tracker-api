function CharacterPower(level) {
  return (1000 + level * 10) * (Math.floor(level / 10) + 1)
}

const WeaponElement = {
  Fire: 0,
  Earth: 1,
  Lightning: 2,
  Water: 3,
}

const WeaponTrait = {
  STR: 0,
  DEX: 1,
  CHA: 2,
  INT: 3,
  PWR: 4,
}

function traitNumberToName(traitNum) {
  switch (traitNum) {
    case WeaponElement.Fire:
      return "Fire"
    case WeaponElement.Earth:
      return "Earth"
    case WeaponElement.Water:
      return "Water"
    case WeaponElement.Lightning:
      return "Lightning"
    default:
      return "???"
  }
}

function getStatPatternFromProperties(properties) {
  return (properties >> 5) & 0x7f
}

function getStat1Trait(statPattern) {
  return statPattern % 5
}

function getStat2Trait(statPattern) {
  return Math.floor(statPattern / 5) % 5
}

function getStat3Trait(statPattern) {
  return Math.floor(Math.floor(statPattern / 5) / 5) % 5
}

function statNumberToName(statNum) {
  switch (statNum) {
    case WeaponTrait.CHA:
      return "CHA"
    case WeaponTrait.DEX:
      return "DEX"
    case WeaponTrait.INT:
      return "INT"
    case WeaponTrait.PWR:
      return "PWR"
    case WeaponTrait.STR:
      return "STR"
    default:
      return "???"
  }
}

function getWeaponTraitFromProperties(properties) {
  return (properties >> 3) & 0x3
}

const CharacterData = (id, data) => {
  const xp = data[0]
  const level = parseInt(data[1], 10)
  const trait = data[2]
  const traitName = traitNumberToName(+data[2])
  const staminaTimestamp = data[3]
  const head = data[4]
  const arms = data[5]
  const torso = data[6]
  const legs = data[7]
  const boots = data[8]
  const race = data[9]
  return {
    id: +id,
    xp,
    level,
    trait,
    traitName,
    staminaTimestamp,
    head,
    arms,
    torso,
    legs,
    boots,
    race,
  }
}

module.exports = {
  CharacterData,
}
