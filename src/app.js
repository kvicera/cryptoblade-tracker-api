const path = require("path")
const express = require("express")
const hbs = require("hbs")

const Common = require("./cryptoblades/Common.js")

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
	res.send("Hello there")
})

const charactersRouter = require('./routes/characters');
const weaponsRouter = require('./routes/weapons');

app.use('/api/characters', charactersRouter)
app.use('/api/weapons', weaponsRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is up on port 3000.")
})
