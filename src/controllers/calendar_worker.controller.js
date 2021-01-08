const packageInformation = require('../../package.json')
const utils = require('../utils')

exports.getInformation = async (req, res, next) => {
    try {
      const packageJson =await utils.packageParseInformation(packageInformation)
      res.status(200).json(packageJson)
    } catch (error) {
      next(error)
    }
  }