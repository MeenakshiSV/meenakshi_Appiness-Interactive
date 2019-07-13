import express from 'express'
import bodyParser from 'body-parser'

import categoriesRouter from './services/categories/categories.route'
import productsRouter from './services/products/products.route'

class server {
    constructor() {
        this.app = express()
        this.config()
        this.routes()
    }

    config() {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({
            extended: true
        }))
    }

    routes() {
        let router = express.Router()

        router.use('/categories',  categoriesRouter)
        router.use('/products', productsRouter)

        this.app.use('/api', router)
    }
}
export default new server().app