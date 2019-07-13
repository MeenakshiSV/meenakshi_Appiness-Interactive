import joi from 'joi'

const add = joi.object().keys({
    category_id : joi.string().required().label('Category Id'),
    product_name : joi.string().required().label('Product Name'),
    product_description : joi.string().min(3).max(50).optional().label('description'),
})

const remove = joi.object().keys({
    category_id : joi.string().required().label('Category ID')
})


export default {
    add,
    remove
}
