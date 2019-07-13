import joi from 'joi'

export default function validator(params) {
    return function (req, res, next) {
        let data
        if(req.method === 'GET') {
            data = req.query
        } else if(req.method === 'POST') {
            data = req.body
        }

        if(data !== undefined && data !== null) { 
            joi.validate(data, params, (err, value) => {
                if(err) {
                    console.log(err);
                    const error = {
                        status: '400',
                        message: err.details[0].message,
                        context: err.details[0].context.key
                    }
                    res.status(error.status).json(error)
                    res.send()
                } else {
                    next()
                }
            })
        } else {
            const error = {
                status: '400',
                messgae: 'Provide all required feilds',
                context: {}
            }
            res.status(error.status).json(error)
            res.end()
        }
    }
}