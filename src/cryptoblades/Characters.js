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
};

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

function CharacterPower(level) {
  return ((1000 + (level * 10)) * (Math.floor(level / 10) + 1));
}

function getElementAdvantage(playerElement, enemyElement) {
  if ((playerElement + 1) % 4 === enemyElement) return 1;
  if ((enemyElement + 1) % 4 === playerElement) return -1;
  return 0;
}

function AdjustStatForTrait(statValue, statTrait, charTrait) {
  let value = statValue;
  if (statTrait === charTrait) { value = Math.floor(value * 1.07); } else if (statTrait === WeaponTrait.PWR) { value = Math.floor(value * 1.03); }
  return value;
}

function MultiplierPerEffectiveStat(statValue) {
  return statValue * 0.25;
}

function Stat1PercentForChar(wep, trait) {
  return MultiplierPerEffectiveStat(AdjustStatForTrait(wep.stat1Value, wep.stat1Type, trait));
}

function Stat2PercentForChar(wep, trait) {
  return MultiplierPerEffectiveStat(AdjustStatForTrait(wep.stat2Value, wep.stat2Type, trait));
}

function Stat3PercentForChar(wep, trait) {
  return MultiplierPerEffectiveStat(AdjustStatForTrait(wep.stat3Value, wep.stat3Type, trait));
}

function GetTotalMultiplierForTrait(wep, trait) {
  return 1 + (0.01 * (Stat1PercentForChar(wep, trait) + Stat2PercentForChar(wep, trait) + Stat3PercentForChar(wep, trait)));
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

function getAlignedCharacterPower(charData, weapData) {
  const characterPower = CharacterPower(charData.level);
  const playerElement = parseInt(charData.trait, 10);
  const weaponMultiplier = GetTotalMultiplierForTrait(weapData, playerElement);
  const totalPower = (characterPower * weaponMultiplier) + weapData.bonusPower;
  return totalPower;
}

const getWinChance = (charData, weapData, enemyPower, enemyElement) => {
  const playerElement = parseInt(charData.trait, 10);
  const weaponElement = parseInt(WeaponElement[weapData.element], 10);
  const totalPower = getAlignedCharacterPower(charData, weapData);
  const totalMultiplier = 1 + (0.075 * (weaponElement === playerElement ? 1 : 0)) + (0.075 * getElementAdvantage(playerElement, enemyElement));
  const playerMin = totalPower * totalMultiplier * 0.9;
  const playerMax = totalPower * totalMultiplier * 1.1;
  const enemyMin = enemyPower * 0.9;
  const enemyMax = enemyPower * 1.1;
  let win = 0;
  let lose = 0;
  for (let playerRoll = Math.floor(playerMin); playerRoll <= playerMax; playerRoll++) {
    for (let enemyRoll = Math.floor(enemyMin); enemyRoll <= enemyMax; enemyRoll++) {
      if (playerRoll >= enemyRoll) {
        win++;
      } else {
        lose++;
      }
    }
  }
  return win / (win + lose);
}

module.exports = {
  CharacterData,
  getEnemyDetails,
  getWinChance
}
