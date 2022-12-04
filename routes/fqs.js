const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')

const FQS_API_KEY= process.env.FQS_API_KEY
const FQS_URL=process.env.FQS_URL

router.get('/', async (req, res)=>{
const params = new URLSearchParams({
    ...url.parse(req.url, true).query
})
try {
        const apiRes = await needle('get', `${FQS_URL}?${params}`)
        const data = apiRes.body
        if(process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${FQS_URL}?${params}`)
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error})
    }
})

module.exports = router