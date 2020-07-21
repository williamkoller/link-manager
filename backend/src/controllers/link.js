const express = require('express')
const router = express.Router()
const { getMessage } = require('../helpers/validator')
const { Link } = require('../models')


router.get('/', (request, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            const links = await Link.findAll()

            resolve(response.jsonOK(links))
        } catch (error) {
            reject(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
        }
    })


})

router.get('/:id', (request, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            const accountId = 2
            const { id } = request.params
            const link = await Link.findOne({ where: { id, accountId } })
            if (!link) return response.jsonNotFound()
            resolve(response.jsonOK(link))
        } catch (error) {
            reject(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
        }
    })
})

router.post('/', (request, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            const accountId = 2
            const { label, url, isSocial } = request.body

            const image = 'https://google.com/image.jpg'

            const link = await Link.create({ label, url, isSocial, image, accountId })

            resolve(response.jsonOK(link))
        } catch (error) {
            reject(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
        }
    })
})

router.put('/:id', (request, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            const accountId = 2
            const { id } = request.params
            const { body } = request
            const fields = ['label', 'url', 'isSocial']

            const link = await Link.findOne({ where: { id, accountId } })
            if (!link) response.jsonNotFound()

            fields.map(fiedlName => {
                const newValue = body[fiedlName]
                if (newValue) link[fiedlName] = newValue
            })

            await link.save()

            resolve(response.jsonOK(link))
        } catch (error) {
            reject(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
        }
    })

})

router.delete('/:id', (request, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id } = request.params
            const link = await Link.findOne({ where: { id } })
            if (!link) return response.jsonNotFound()
            await Link.destroy({ where: { id } })
            resolve(response.jsonOK())
        } catch (error) {
            reject(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
        }
    })
})

module.exports = router