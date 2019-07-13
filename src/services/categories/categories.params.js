import joi from 'joi'

const add = joi.object().keys({
    category_name : joi.string().required().label('Category Name'),
    category_description : joi.string().min(3).max(50).optional().label('description'),
})

const single_list = joi.object().keys({
    category_id : joi.string().required().label('Category ID')
})

const remove = joi.object().keys({
    category_id : joi.string().required().label('Category ID')
})


export default {
    add,
    single_list,
    remove
}
