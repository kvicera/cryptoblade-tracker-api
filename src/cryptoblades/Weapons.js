const WeaponElement = {
	Fire: 0,
	Earth: 1,
	Lightning: 2,
	Water: 3,
};

const WeaponTrait = {
	STR: 0,
	DEX: 1,
	CHA: 2,
	INT: 3,
	PWR: 4,
};

function traitNumberToName(traitNum) {
	switch (traitNum) {
		 case WeaponElement.Fire: return 'Fire';
		 case WeaponElement.Earth: return 'Earth';
		 case WeaponElement.Water: return 'Water';
		 case WeaponElement.Lightning: return 'Lightning';
		 default: return '???';
	}
}

function getStatPatternFromProperties(properties) {
	return (properties >> 5) & 0x7f;
}

function getStat1Trait(statPattern) {
	return (statPattern % 5);
}

function getStat2Trait(statPattern) {
	return (Math.floor(statPattern / 5) % 5);
}

function getStat3Trait(statPattern) {
	return (Math.floor(Math.floor(statPattern / 5) / 5) % 5);
}

function statNumberToName(statNum) {
	switch (statNum) {
		 case WeaponTrait.CHA: return 'CHA';
		 case WeaponTrait.DEX: return 'DEX';
		 case WeaponTrait.INT: return 'INT';
		 case WeaponTrait.PWR: return 'PWR';
		 case WeaponTrait.STR: return 'STR';
		 default: return '???';
	}
}

function getWeaponTraitFromProperties(properties) {
	return (properties >> 3) & 0x3;
}

const getWeaponData = (id, data) => {
	const properties = data[0];
	const stat1 = data[1];
	const stat2 = data[2];
	const stat3 = data[3];
	const level = +data[4];
	const blade = data[5];
	const crossguard = data[6];
	const grip = data[7];
	const pommel = data[8];
	const burnPoints = +data[9];
	const bonusPower = +data[10];

	const stat1Value = +stat1;
	const stat2Value = +stat2;
	const stat3Value = +stat3;

	const statPattern = getStatPatternFromProperties(+properties);
	const stat1Type = getStat1Trait(statPattern);
	const stat2Type = getStat2Trait(statPattern);
	const stat3Type = getStat3Trait(statPattern);

	const traitNum = getWeaponTraitFromProperties(+properties);

	const lowStarBurnPoints = burnPoints & 0xff;
	const fourStarBurnPoints = (burnPoints >> 8) & 0xff;
	const fiveStarBurnPoints = (burnPoints >> 16) & 0xff;

	const stars = (+properties) & 0x7;
	return {
		 id: +id,
		 properties,
		 trait: traitNum,
		 element: traitNumberToName(traitNum),
		 stat1: statNumberToName(stat1Type),
		 stat1Value,
		 stat1Type,
		 stat2: statNumberToName(stat2Type),
		 stat2Value,
		 stat2Type,
		 stat3: statNumberToName(stat3Type),
		 stat3Value,
		 stat3Type,
		 level,
		 blade,
		 crossguard,
		 grip,
		 pommel,
		 stars,
		 lowStarBurnPoints,
		 fourStarBurnPoints,
		 fiveStarBurnPoints,
		 bonusPower,
	};
}

module.exports = {
	getWeaponData
}