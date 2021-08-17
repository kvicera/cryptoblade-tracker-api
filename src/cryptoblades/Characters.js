const WeaponElement = {
  Fire: 0,
  Earth: 1,
  Lightning: 2,
  Water: 3,
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

const getEnemyDetails = (targets) => {
	return targets.map(data => {
		 const n = parseInt(data, 10)
		 return {
			  original: data,
			  power: n & 16777215,
			  trait: traitNumberToName(n >> 24)
		 }
	})
}

module.exports = {
  CharacterData,
  getEnemyDetails
}
