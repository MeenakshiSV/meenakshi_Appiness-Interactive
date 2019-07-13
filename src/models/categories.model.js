import mongoose from 'mongoose'

let categoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        default: null
    },
    status: {
        disabled: {
            type: Boolean, // if true, category temporary disabled
            default: false
        },
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

let categoriesModel = mongoose.model('categories', categoriesSchema, 'categories')

export default categoriesModel