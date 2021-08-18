const path = require('path')
const express = require('express')
const hbs = require('hbs')

const Common = require('./cryptoblades/Common.js')

const router = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
//const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
router.set('view engine', 'hbs')
router.set('views', viewsPath)
//hbs.registerPartials(partialsPath)

// Setup static directory to serve
router.use(express.static(publicDirectoryPath))

router.get('', (req, res) => {
  res.send('Hello there')
})

const characterRouter = require('./routes/character')
const weaponRouter = require('./routes/weapon')
const accountRouter = require('./routes/account')

router.use('/api/character', characterRouter)
router.use('/api/weapon', weaponRouter)
router.use('/api/account', accountRouter)

router.listen(process.env.PORT || 3000, () => {
  console.log('Server is up on port 3000.')
})
