const express = require('express')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

app.disable('x-powered-by')

app.use(express.static('build'))

// serve our static stuff like index.css
app.use(express.static(__dirname))

const BACKEND = process.env.BACKEND

app.use(
  '/API_BASE',
  createProxyMiddleware({
    target: BACKEND,
    changeOrigin: true,
    pathRewrite: {
      '^/API_BASE': ''
    }
  })
)

// send all requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const PORT = process.env.PORT || 80
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Production Express server running at: ${PORT}.`)
})
