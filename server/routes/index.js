var router = require('express').Router()
var items = require('./items')

router.use('/items', items)

router.get('/', function (req, res) {
  res.status(200).json({ message: 'Estás conectado a nuestra API' })
})

module.exports = router