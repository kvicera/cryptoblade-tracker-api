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
  const next_lvl = getNextTargetExpLevel(level)
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
    next_lvl,
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

const experienceTable = [
  16, 17, 18, 19, 20, 22, 24, 26, 28, 30, 33, 36, 39, 42, 46, 50, 55, 60, 66,
  72, 79, 86, 94, 103, 113, 124, 136, 149, 163, 178, 194, 211, 229, 248, 268,
  289, 311, 334, 358, 383, 409, 436, 464, 493, 523, 554, 586, 619, 653, 688,
  724, 761, 799, 838, 878, 919, 961, 1004, 1048, 1093, 1139, 1186, 1234, 1283,
  1333, 1384, 1436, 1489, 1543, 1598, 1654, 1711, 1769, 1828, 1888, 1949, 2011,
  2074, 2138, 2203, 2269, 2336, 2404, 2473, 2543, 2614, 2686, 2759, 2833, 2908,
  2984, 3061, 3139, 3218, 3298, 3379, 3461, 3544, 3628, 3713, 3799, 3886, 3974,
  4063, 4153, 4244, 4336, 4429, 4523, 4618, 4714, 4811, 4909, 5008, 5108, 5209,
  5311, 5414, 5518, 5623, 5729, 5836, 5944, 6053, 6163, 6274, 6386, 6499, 6613,
  6728, 6844, 6961, 7079, 7198, 7318, 7439, 7561, 7684, 7808, 7933, 8059, 8186,
  8314, 8443, 8573, 8704, 8836, 8969, 9103, 9238, 9374, 9511, 9649, 9788, 9928,
  10069, 10211, 10354, 10498, 10643, 10789, 10936, 11084, 11233, 11383, 11534,
  11686, 11839, 11993, 12148, 12304, 12461, 12619, 12778, 12938, 13099, 13261,
  13424, 13588, 13753, 13919, 14086, 14254, 14423, 14593, 14764, 14936, 15109,
  15283, 15458, 15634, 15811, 15989, 16168, 16348, 16529, 16711, 16894, 17078,
  17263, 17449, 17636, 17824, 18013, 18203, 18394, 18586, 18779, 18973, 19168,
  19364, 19561, 19759, 19958, 20158, 20359, 20561, 20764, 20968, 21173, 21379,
  21586, 21794, 22003, 22213, 22424, 22636, 22849, 23063, 23278, 23494, 23711,
  23929, 24148, 24368, 24589, 24811, 25034, 25258, 25483, 25709, 25936, 26164,
  26393, 26623, 26854, 27086, 27319, 27553, 27788, 28024, 28261, 28499, 28738,
  28978,
];

function getNextTargetExpLevel(level) {    
  let next = (Math.floor(level / 10) + 1) * 10;
  if (next === level) {
      next = level + 11
  }
  let exp = 0;
  for (let i = level; i < next; i++) {
      exp += experienceTable[i];
  }
  return {
      level: next,
      exp,
  };
}

module.exports = {
  CharacterData,
  getEnemyDetails,
  getWinChance
}
