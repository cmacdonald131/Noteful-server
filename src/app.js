require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const notesRouter = require('./notes/notes-router')
const foldersRouter = require('./folders/folders-router')
const errorHandler = require('./error-handler')
const validateBearerToken = require('./validate-bearer-token')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test'
  }))
  app.use(cors())
  app.use(helmet())
  app.use(validateBearerToken)

  app.use('/notes', notesRouter)
  app.use('/folders', foldersRouter)
     
  app.get('/', (req, res) => {
    res.send('Hello, world!')
  })
  
  app.use(errorHandler)
  
  module.exports = app