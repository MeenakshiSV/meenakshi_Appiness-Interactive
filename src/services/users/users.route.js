import express from 'express'
import paramValidators from '../../middlewares/param-validators'
import params from './users.params'
import usersCtrl from './users.controller'

class usersRoute {
    constructor() {
        this.router = express.Router()
        this.routes()
    } 
    routes() {
        this.router.post('/register', paramValidators(params.register), this.register)
        this.router.get('/list', this.list)
    }
    register(req, res) {
        console.log(req.body)
        usersCtrl.register(req.body).then(result => {
            res.status(result.status).json(result)
            res.end()
        }).catch(error => {
            console.log(error)
            res.status(error.status).json(error)
            res.end()
        })
    }
    list(req, res) {
        console.log(req.query)
        usersCtrl.list(req.query).then(result => {
            res.status(result.status).json(result)
            res.end()
        }).catch(error => {
            console.log(error)
            res.status(error.status).json(error)
            res.end()
        })
    }
}

export default new usersRoute().router