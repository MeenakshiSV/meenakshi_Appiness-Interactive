import mongoose from 'mongoose'

let productsSchema = mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
    },
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
            type: Boolean, // if true, product temporary disabled
            default: false
        },
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

productsSchema.index({
    name: 'text'
})

productsSchema.statics = {
    geyByName(_name) {
        return this.findOne({
            'name': _name
        }).exec()
    },
}

let productsModel = mongoose.model('products', productsSchema, 'products')

export default productsModel