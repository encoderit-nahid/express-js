const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('User')
})

router.route('/:id')
    .get((req, res) => {
        res.send('View User')
    })
    .put((req, res) => {
        res.send('Update User')
    })
    .delete((req, res) => {
        res.send('Delete User')
    })

module.exports = router