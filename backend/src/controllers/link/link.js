const express = require('express')
const router = express.Router()
const { getMessage } = require('../../helpers/validator')
const { Link } = require('../../models')

router.get('/', async (request, response) => {
    try {
        const { accountId } = request
        const links = await Link.findAll({ where: { accountId } })

        return response.jsonOK(links)
    } catch (error) {
        throw new Error(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
    }

})

router.get('/:id', async (request, response) => {
    try {
        const { accountId } = request
        const { id } = request.params
        const link = await Link.findOne({ where: { id, accountId } })
        if (!link) return response.jsonNotFound()
        return response.jsonOK(link)
    } catch (error) {
        throw new Error(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
    }
})

router.post('/', async (request, response) => {
    try {
        const { accountId, body } = request
        const { label, url, isSocial } = body

        const image = 'https://google.com/image.jpg'

        const link = await Link.create({ label, url, isSocial, image, accountId })

        return response.jsonOK(link)
    } catch (error) {
        throw new Error(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
    }

})

router.put('/:id', async (request, response) => {
    try {
        const { accountId, body } = request
        const { id } = request.params
        const fields = ['label', 'url', 'isSocial']

        const link = await Link.findOne({ where: { id, accountId } })
        if (!link) response.jsonNotFound()

        fields.map(fiedlName => {
            const newValue = body[fiedlName]
            if (newValue) link[fiedlName] = newValue
        })

        await link.save()

        return response.jsonOK(link)
    } catch (error) {
        throw new Error(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
    }


})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request
        const link = await Link.findOne({ where: { id } })
        if (!link) return response.jsonNotFound()
        await Link.destroy({ where: { id } })
        return response.jsonOK()
    } catch (error) {
        throw new Error(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
    }

})

module.exports = router