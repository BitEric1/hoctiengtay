const router = require('express').Router()
const resource = require('../database/start.json')

router.get('/', (req, res) => {
    console.log('Fetching all courses')
    // res.send('Fetching all courses')
    // res.json(resource)
    res.status(200).json({
        ok: true,
        data: resource,
    })
    // console.log(resource)
    // res.status(200).json({
    //     ok: true,
    //     data: data.courses
    // })
})

module.exports = router
