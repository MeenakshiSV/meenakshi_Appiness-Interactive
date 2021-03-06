import express from 'express'
import paramValidators from '../../middlewares/param-validators'
import params from './products.params'
import productsCtrl from './products.controller'

class productRoute {
    constructor() {
        this.router = express.Router()
        this.routes()
    } 
    routes() {
        this.router.post('/add', paramValidators(params.add), this.add)
        this.router.get('/list-category-wise', this.productListCategoryWise)
    }
    add(req, res) {
        console.log(req.body)
        productsCtrl.add(req.body).then(result => {
            res.status(result.status).json(result)
            res.end()
        }).catch(error => {
            console.log(error)
            res.status(error.status).json(error)
            res.end()
        })
    }

    productListCategoryWise(req, res) {
        productsCtrl.productListCategoryWise(req.query).then(result => {
            res.status(result.status).json(result)
            res.end()
        }).catch(error => {
            console.log(error)
            res.status(error.status).json(error)
            res.end()
        }) 
    }

}

export default new productRoute().router