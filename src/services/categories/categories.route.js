import express from 'express'
import paramValidators from '../../middlewares/param-validators'
import params from './categories.params'
import categoriesCtrl from './categories.controller'

class categoriesRoute {
    constructor() {
        this.router = express.Router()
        this.routes()
    } 
    routes() {
        this.router.post('/add', paramValidators(params.add), this.add)
        this.router.get('/list', this.list)
        this.router.get('/remove', paramValidators(params.remove),this.remove)
    }
    add(req, res) {
        console.log(req.body)
        categoriesCtrl.add(req.body).then(result => {
            res.status(result.status).json(result)
            res.end()
        }).catch(error => {
            console.log(error)
            res.status(error.status).json(error)
            res.end()
        })
    }

    list(req, res) {
        categoriesCtrl.list(req.body).then(result => {
            res.status(result.status).json(result)
            res.end()
        }).catch(error => {
            console.log(error)
            res.status(error.status).json(error)
            res.end()
        })
    }

    remove(req, res) {
        categoriesCtrl.remove(req.query).then(result => {
            res.status(result.status).json(result)
            res.end()
        }).catch(error => {
            console.log(error)
            res.status(error.status).json(error)
            res.end()
        })
    }

}

export default new categoriesRoute().router