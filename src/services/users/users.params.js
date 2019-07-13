import joi from 'joi'
import regx from '../../constants/reg-ex'

const register = joi.object().keys({
    name: joi.string().required().label("User Name"),
    email: joi.string().regex(regx.email).optional().allow([null, ""]).label("User Email"),
    phone: joi.object().keys({
        code: joi.string().required().label("Country Code"),
        number: joi.string().regex(regx.phone).required().label("Phone Number")
    }).required().label("Customer Phone"),
    gender: joi.string().regex(regx.gender).required().label("User Gender"),
    address: joi.string().optional().label("user address"),
    user_role: joi.string().required().label("User Role")

})

export default {
    register
}