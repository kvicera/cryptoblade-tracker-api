# cryptoblade-tracker-api
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /><img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" />

cryptoblades-tracker-api based on ed3ath's cbtracker (https://github.com/ed3ath/cbtracker)

<h1>Current API Endpoints</h1>

<h5>/getCharacters</h5>
http://localhost:3000/api/character/getCharacters?address=0x0000000000000000000000000000000000000000
<br>
<h5>/getCharacterData</h5>
http://localhost:3000/api/character/getCharacterData?charId=XXXXXXX
<br>
<h5>/getWeaponData</h5>
http://localhost:3000/api/weapon/getWeaponData?weapId=XXXXXXX
<br>
<h5>/getEnemies</h5>
http://localhost:3000/api/character/getEnemies?charId=XXXXXXX&weapId=XXXXXXX
<br>
<h5>/getUnclaimedCharacterExp</h5>
http://localhost:3000/api/character/getUnclaimedCharacterExp?charId=1582086
<br>
<h5>getBNBBalance</h5>
http://localhost:3000/api/account/getBNBBalance?address=0x03c08F176f4AC01EE89ff56196035f723DC723dC
<h5>getStakedBal</h5>
http://localhost:3000/api/account/getStakedBal?address=0x03c08F176f4AC01EE89ff56196035f723DC723dC