import mongoose from 'mongoose'

let usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    phone: {
        code: {
            type: String, // Country code like +91
            required: true,
        },
        number: {
            type: String, // 10 digit user phone number like 9999999999
            required: true,
        }
    },
    email: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

let usersModel = mongoose.model('users', usersSchema, 'users')

export default usersModel