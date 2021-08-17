const path = require("path")
const express = require("express")
const hbs = require("hbs")

const Addresses = require("./cryptoblades/Addresses.js")
const Connections = require("./cryptoblades/Connections.js")
const Characters = require("./cryptoblades/Characters.js")
const utils = require("./utils.js")

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
//const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
//hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
  res.render("index", {
    title: "x",
    name: "xx",
  })
})

app.get("/api/getCharacters", (req, res) => {
  try {
    const address = req.query.address

    if (utils.CheckAddress(address)) {
      Connections.conCryptoBlades.methods
        .getMyCharacters()
        .call({ from: address })
        .then(function (result) {
          res.send(result)
        })
    } else {
      res.send("Error: Invalid address passed in url parameter!")
    }
  } catch (err) {
    res.send("Error!")
  }
})

app.get("/api/getCharacterData", (req, res) => {
  try {
    const charId = req.query.charId

    if (charId !== "") {
      Connections.conCharacters.methods
        .get(charId)
        .call({ from: Addresses.defaultAddress })
        .then(function (result) {
          let charData = Characters.CharacterData(charId, result)

          Connections.conCharacters.methods
            .getStaminaPoints(charId)
            .call({ from: Addresses.defaultAddress })
            .then(function (result_stamina) {
              charData["stamina"] = result_stamina
              res.send(charData)
            })
        })
    } else {
      res.send("Error: Invalid address passed in url parameter!")
    }
  } catch (err) {
    res.send("Error!")
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is up on port 3000.")
})
