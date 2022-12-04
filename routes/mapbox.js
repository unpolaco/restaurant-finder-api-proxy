const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')

const MAPBOX_TOKEN= process.env.MAPBOX_TOKEN
const MAPBOX_URL= process.env.MAPBOX_URL

router.get('/', async (req, res)=>{
const params = new URLSearchParams({
    access_token: MAPBOX_TOKEN,
    ...url.parse(req.url, true).query
})

    try {
        const apiRes = await needle('get', `${MAPBOX_URL}?${params}`)
        const data = apiRes.body
        if(proxess.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${MAPBOX_URL}?${params}`)
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error})
    }
})

module.exports = router